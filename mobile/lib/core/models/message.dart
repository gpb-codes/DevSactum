class Message {
  final String id;
  final String text;
  final bool isMine;
  final DateTime createdAt;
  bool read;

  Message({
    required this.id,
    required this.text,
    this.isMine = false,
    DateTime? createdAt,
    this.read = false,
  }) : createdAt = createdAt ?? DateTime.now();
}

class Contact {
  final String id;
  final String name;
  final String? lastMessage;
  final bool online;
  final int unread;

  Contact({
    required this.id,
    required this.name,
    this.lastMessage,
    this.online = false,
    this.unread = 0,
  });
}
