class AppNotification {
  final String id;
  final String type;
  final String actorName;
  final String? postPreview;
  bool read;
  final DateTime createdAt;

  AppNotification({
    required this.id,
    required this.type,
    required this.actorName,
    this.postPreview,
    this.read = false,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();
}
