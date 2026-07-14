import 'dart:math';
import 'package:flutter/material.dart';

String getInitials(String name) {
  final parts = name.split(' ');
  if (parts.length >= 2) {
    return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
  }
  return name.isNotEmpty ? name[0].toUpperCase() : '?';
}

String timeAgo(DateTime date) {
  final now = DateTime.now();
  final diff = now.difference(date);

  if (diff.inSeconds < 60) return 'ahora';
  if (diff.inMinutes < 60) return 'hace ${diff.inMinutes}m';
  if (diff.inHours < 24) return 'hace ${diff.inHours}h';
  if (diff.inDays < 7) return 'hace ${diff.inDays}d';
  return '${date.day}/${date.month}/${date.year}';
}

String formatCount(int count) {
  if (count >= 1000000) return '${(count / 1000000).toStringAsFixed(1)}M';
  if (count >= 1000) return '${(count / 1000).toStringAsFixed(1)}k';
  return count.toString();
}

List<Color> getAvatarPalette(String seed) {
  final hash = seed.hashCode;
  final rng = Random(hash);
  final colors = [
    const Color(0xFF7C3AED),
    const Color(0xFF3B82F6),
    const Color(0xFF06B6D4),
    const Color(0xFF10B981),
    const Color(0xFFF59E0B),
    const Color(0xFFEF4444),
    const Color(0xFFEC4899),
  ];
  return [colors[rng.nextInt(colors.length)], colors[rng.nextInt(colors.length)]];
}
