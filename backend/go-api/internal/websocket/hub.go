package websocket

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Client struct {
	ID     string
	UserID string
	Conn   *websocket.Conn
	Send   chan []byte
	Hub    *Hub
	Rooms  map[string]bool
	mu     sync.Mutex
}

type Hub struct {
	Clients    map[*Client]bool
	Broadcast  chan *Message
	Register   chan *Client
	Unregister chan *Client
	Rooms      map[string]map[*Client]bool
	mu         sync.RWMutex
}

type Message struct {
	Type      string      `json:"type"`
	Room      string      `json:"room,omitempty"`
	Sender    string      `json:"sender,omitempty"`
	SenderID  string      `json:"senderId,omitempty"`
	Content   string      `json:"content,omitempty"`
	Data      interface{} `json:"data,omitempty"`
	Timestamp int64       `json:"timestamp,omitempty"`
}

var DefaultHub *Hub

func NewHub() *Hub {
	return &Hub{
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan *Message, 256),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Rooms:      make(map[string]map[*Client]bool),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			h.mu.Lock()
			h.Clients[client] = true
			h.mu.Unlock()
			log.Printf("[WS] Client connected: %s (user: %s)", client.ID, client.UserID)

		case client := <-h.Unregister:
			h.mu.Lock()
			if _, ok := h.Clients[client]; ok {
				delete(h.Clients, client)
				close(client.Send)
				for room := range client.Rooms {
					if clients, ok := h.Rooms[room]; ok {
						delete(clients, client)
					}
				}
			}
			h.mu.Unlock()
			log.Printf("[WS] Client disconnected: %s", client.ID)

		case message := <-h.Broadcast:
			data, _ := json.Marshal(message)
			h.mu.RLock()
			if message.Room != "" {
				if clients, ok := h.Rooms[message.Room]; ok {
					for client := range clients {
						select {
						case client.Send <- data:
						default:
							close(client.Send)
							delete(h.Clients, client)
						}
					}
				}
			} else {
				for client := range h.Clients {
					select {
					case client.Send <- data:
					default:
						close(client.Send)
						delete(h.Clients, client)
					}
				}
			}
			h.mu.RUnlock()
		}
	}
}

func (h *Hub) JoinRoom(client *Client, room string) {
	h.mu.Lock()
	defer h.mu.Unlock()

	if h.Rooms[room] == nil {
		h.Rooms[room] = make(map[*Client]bool)
	}
	h.Rooms[room][client] = true
	client.Rooms[room] = true
}

func (h *Hub) LeaveRoom(client *Client, room string) {
	h.mu.Lock()
	defer h.mu.Unlock()

	if clients, ok := h.Rooms[room]; ok {
		delete(clients, client)
	}
	delete(client.Rooms, room)
}

func (h *Hub) GetOnlineCount() int {
	h.mu.RLock()
	defer h.mu.RUnlock()
	return len(h.Clients)
}

func (h *Hub) GetRoomOnlineCount(room string) int {
	h.mu.RLock()
	defer h.mu.RUnlock()
	if clients, ok := h.Rooms[room]; ok {
		return len(clients)
	}
	return 0
}

func (h *Hub) SendToUser(userID string, msg *Message) {
	data, _ := json.Marshal(msg)
	h.mu.RLock()
	defer h.mu.RUnlock()
	for client := range h.Clients {
		if client.UserID == userID {
			select {
			case client.Send <- data:
			default:
			}
		}
	}
}

func HandleWebSocket(c *gin.Context) {
	userID := c.Query("userId")
	if userID == "" {
		userID = "anonymous-" + c.ClientIP()
	}

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("[WS] Upgrade error: %v", err)
		return
	}

	client := &Client{
		ID:     conn.LocalAddr().String(),
		UserID: userID,
		Conn:   conn,
		Send:   make(chan []byte, 256),
		Hub:    DefaultHub,
		Rooms:  make(map[string]bool),
	}

	DefaultHub.Register <- client
	DefaultHub.JoinRoom(client, "global")

	go client.WritePump()
	go client.ReadPump()
}

func (c *Client) ReadPump() {
	defer func() {
		c.Hub.Unregister <- c
		c.Conn.Close()
	}()

	for {
		_, raw, err := c.Conn.ReadMessage()
		if err != nil {
			break
		}

		var msg Message
		if err := json.Unmarshal(raw, &msg); err != nil {
			continue
		}

		switch msg.Type {
		case "chat_message":
			c.Hub.Broadcast <- &Message{
				Type:     "chat_message",
				Room:     msg.Room,
				Sender:   msg.Sender,
				SenderID: c.UserID,
				Content:  msg.Content,
			}

		case "join_room":
			c.Hub.JoinRoom(c, msg.Room)
			c.Hub.Broadcast <- &Message{
				Type: "user_joined",
				Room: msg.Room,
				Data: map[string]string{"userId": c.UserID},
			}

		case "leave_room":
			c.Hub.LeaveRoom(c, msg.Room)
			c.Hub.Broadcast <- &Message{
				Type: "user_left",
				Room: msg.Room,
				Data: map[string]string{"userId": c.UserID},
			}

		case "typing":
			c.Hub.Broadcast <- &Message{
				Type:     "typing",
				Room:     msg.Room,
				SenderID: c.UserID,
			}

		case "ping":
			c.Send <- []byte(`{"type":"pong"}`)
		}
	}
}

func (c *Client) WritePump() {
	defer c.Conn.Close()

	for message := range c.Send {
		if err := c.Conn.WriteMessage(websocket.TextMessage, message); err != nil {
			break
		}
	}
}

func RegisterRoutes(r *gin.Engine) {
	DefaultHub = NewHub()
	go DefaultHub.Run()

	r.GET("/ws", HandleWebSocket)

	r.GET("/ws/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"online":  DefaultHub.GetOnlineCount(),
			"service": "websocket",
		})
	})
}
