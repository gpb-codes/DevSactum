import 'package:flutter/material.dart';
import '../core/utils/helpers.dart';

class UserAvatar extends StatelessWidget {
  final String name;
  final String? avatarUrl;
  final double size;

  const UserAvatar({super.key, required this.name, this.avatarUrl, this.size = 40});

  @override
  Widget build(BuildContext context) {
    final palette = getAvatarPalette(name);

    return CircleAvatar(
      radius: size / 2,
      backgroundColor: palette[0],
      child: Text(
        getInitials(name),
        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: size * 0.4),
      ),
    );
  }
}
