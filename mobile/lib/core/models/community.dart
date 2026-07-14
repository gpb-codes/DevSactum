class Community {
  final String id;
  final String name;
  final String? badge;
  final String? description;
  final int members;
  final int online;
  final ColorData? color;

  Community({
    required this.id,
    required this.name,
    this.badge,
    this.description,
    this.members = 0,
    this.online = 0,
    this.color,
  });

  factory Community.fromJson(Map<String, dynamic> json) => Community(
    id: json['id'],
    name: json['name'],
    badge: json['badge'],
    description: json['description'],
    members: json['members'] ?? 0,
    online: json['online'] ?? 0,
    color: json['color'] != null ? ColorData.fromJson(json['color']) : null,
  );
}

class ColorData {
  final String color;
  final String bg;

  ColorData({required this.color, required this.bg});

  factory ColorData.fromJson(Map<String, dynamic> json) =>
    ColorData(color: json['color'], bg: json['bg']);
}
