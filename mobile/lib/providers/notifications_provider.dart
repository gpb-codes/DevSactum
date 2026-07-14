import 'package:flutter/material.dart';
import '../core/models/notification.dart';
import '../core/network/websocket_client.dart';

class NotificationsProvider extends ChangeNotifier {
  final List<AppNotification> _notifications = [];
  int _unreadCount = 0;
  bool _soundEnabled = true;
  WebSocketClient? _ws;

  List<AppNotification> get notifications => _notifications;
  int get unreadCount => _unreadCount;
  bool get soundEnabled => _soundEnabled;

  void connect(String token) {
    _ws = WebSocketClient('wss://api.devsactum.com/ws?token=$token');
    _ws!.on('notification', _handleNotification);
    _ws!.connect();
  }

  void disconnect() {
    _ws?.dispose();
  }

  void _handleNotification(Map<String, dynamic> data) {
    addNotification(AppNotification(
      id: data['id'] ?? DateTime.now().millisecondsSinceEpoch.toString(),
      actorName: data['actor']?['name'] ?? 'Sistema',
      type: data['notificationType'] ?? 'system',
      postPreview: data['postPreview'],
    ));
  }

  void addNotification(AppNotification notification) {
    _notifications.insert(0, notification);
    if (!notification.read) _unreadCount++;
    notifyListeners();
  }

  void markAsRead(String id) {
    final idx = _notifications.indexWhere((n) => n.id == id);
    if (idx != -1 && !_notifications[idx].read) {
      _notifications[idx].read = true;
      _unreadCount--;
      notifyListeners();
    }
  }

  void markAllRead() {
    for (final n in _notifications) {
      n.read = true;
    }
    _unreadCount = 0;
    notifyListeners();
  }

  void clearAll() {
    _notifications.clear();
    _unreadCount = 0;
    notifyListeners();
  }

  void toggleSound() {
    _soundEnabled = !_soundEnabled;
    notifyListeners();
  }
}
