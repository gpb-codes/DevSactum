import 'package:flutter/material.dart';
import '../core/models/post.dart';
import '../core/utils/helpers.dart';
import 'user_avatar.dart';
import 'glass_card.dart';

class PostCard extends StatelessWidget {
  final Post post;
  final VoidCallback? onLike;

  const PostCard({super.key, required this.post, this.onLike});

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              UserAvatar(name: post.authorName, size: 42),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(post.authorName, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                    Row(
                      children: [
                        Text('@${post.authorHandle}', style: TextStyle(color: Colors.grey[500], fontSize: 12)),
                        const SizedBox(width: 6),
                        Text('·', style: TextStyle(color: Colors.grey[600], fontSize: 10)),
                        const SizedBox(width: 6),
                        Text(timeAgo(post.createdAt), style: TextStyle(color: Colors.grey[500], fontSize: 12)),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(post.text, style: const TextStyle(fontSize: 15, height: 1.5)),
          if (post.code != null) ...[
            const SizedBox(height: 12),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.black26,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                post.code!,
                style: const TextStyle(fontFamily: 'JetBrainsMono', fontSize: 13, height: 1.4),
              ),
            ),
          ],
          if (post.tags.isNotEmpty) ...[
            const SizedBox(height: 12),
            Wrap(
              spacing: 6,
              runSpacing: 6,
              children: post.tags.map((t) => Chip(
                label: Text('#$t', style: const TextStyle(fontSize: 11, color: Color(0xFF7C3AED))),
                backgroundColor: const Color(0xFF7C3AED).withValues(alpha: 0.1),
                side: const BorderSide(color: Color(0xFF7C3AED), width: 0.3),
                materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                visualDensity: VisualDensity.compact,
                padding: EdgeInsets.zero,
                labelPadding: const EdgeInsets.symmetric(horizontal: 8),
              )).toList(),
            ),
          ],
          const SizedBox(height: 12),
          Row(
            children: [
              _ActionButton(
                icon: post.liked ? Icons.favorite : Icons.favorite_border,
                color: post.liked ? Colors.red : null,
                count: post.likes,
                onTap: onLike,
              ),
              const SizedBox(width: 24),
              _ActionButton(icon: Icons.chat_bubble_outline, count: post.comments),
              const SizedBox(width: 24),
              _ActionButton(icon: Icons.repeat, count: post.shares),
              const Spacer(),
              Icon(Icons.bookmark_border, size: 18, color: Colors.grey[500]),
            ],
          ),
        ],
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final IconData icon;
  final Color? color;
  final int count;
  final VoidCallback? onTap;

  const _ActionButton({required this.icon, this.color, this.count = 0, this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 18, color: color ?? Colors.grey[400]),
          const SizedBox(width: 4),
          Text(formatCount(count), style: TextStyle(color: Colors.grey[400], fontSize: 12)),
        ],
      ),
    );
  }
}
