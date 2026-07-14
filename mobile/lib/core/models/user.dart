class User {
  final String id;
  final String name;
  final String handle;
  final String email;
  final String? bio;
  final String? avatarUrl;
  final String role; // 'developer' | 'company'
  final int reputation;

  User({
    required this.id,
    required this.name,
    required this.handle,
    required this.email,
    this.bio,
    this.avatarUrl,
    this.role = 'developer',
    this.reputation = 0,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json['id'],
    name: json['name'],
    handle: json['handle'],
    email: json['email'],
    bio: json['bio'],
    avatarUrl: json['avatarUrl'],
    role: json['role'] ?? 'developer',
    reputation: json['reputation'] ?? 0,
  );
}

class AuthUser {
  final String token;
  final User user;

  AuthUser({required this.token, required this.user});

  factory AuthUser.fromJson(Map<String, dynamic> json) => AuthUser(
    token: json['token'],
    user: User.fromJson(json['user']),
  );
}
