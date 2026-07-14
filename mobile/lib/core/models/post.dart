class Post {
  final String id;
  final String authorName;
  final String authorHandle;
  final String? authorAvatar;
  final String text;
  final String? code;
  final List<String> tags;
  final DateTime createdAt;
  int likes;
  int comments;
  int shares;
  bool liked;

  Post({
    required this.id,
    required this.authorName,
    required this.authorHandle,
    this.authorAvatar,
    required this.text,
    this.code,
    this.tags = const [],
    DateTime? createdAt,
    this.likes = 0,
    this.comments = 0,
    this.shares = 0,
    this.liked = false,
  }) : createdAt = createdAt ?? DateTime.now();

  factory Post.fromJson(Map<String, dynamic> json) => Post(
    id: json['id'],
    authorName: json['authorName'],
    authorHandle: json['authorHandle'],
    authorAvatar: json['authorAvatar'],
    text: json['text'],
    code: json['code'],
    tags: List<String>.from(json['tags'] ?? []),
    createdAt: DateTime.tryParse(json['createdAt'] ?? ''),
    likes: json['likes'] ?? 0,
    comments: json['comments'] ?? 0,
    shares: json['shares'] ?? 0,
    liked: json['liked'] ?? false,
  );
}
