import 'package:flutter/material.dart';
import '../../widgets/glass_card.dart';

class ReputationScreen extends StatelessWidget {
  const ReputationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: Theme.of(context).brightness == Brightness.dark
                ? [const Color(0xFF0D0D1A), const Color(0xFF08080F)]
                : [const Color(0xFFF5F3FF), const Color(0xFFF8F6FF)],
          ),
        ),
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Padding(
                padding: EdgeInsets.fromLTRB(20, 20, 20, 16),
                child: Text('Reputación', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
              ),
              Expanded(
                child: ListView(
                  padding: const EdgeInsets.only(bottom: 80),
                  children: [
                    GlassCard(
                      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        children: [
                          Container(
                            width: 80, height: 80,
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(colors: [Color(0xFFF59E0B), Color(0xFFEF4444)]),
                              borderRadius: BorderRadius.circular(24),
                            ),
                            child: const Center(child: Text('#1', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold))),
                          ),
                          const SizedBox(height: 16),
                          const Text('2,450 pts', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 4),
                          Text('Puntos de reputación', style: TextStyle(color: Colors.grey[500])),
                        ],
                      ),
                    ),
                    const Padding(
                      padding: EdgeInsets.fromLTRB(20, 12, 20, 8),
                      child: Text('Leaderboard', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                    ),
                    _LeaderTile(rank: 1, name: 'Ana García', points: 3200, badge: Icons.emoji_events, color: const Color(0xFFF59E0B)),
                    _LeaderTile(rank: 2, name: 'Carlos López', points: 2850, badge: Icons.emoji_events, color: const Color(0xFF94A3B8)),
                    _LeaderTile(rank: 3, name: 'María Torres', points: 2450, badge: Icons.emoji_events, color: const Color(0xFF92400E)),
                    _LeaderTile(rank: 4, name: 'Tú', points: 2200, badge: null, color: const Color(0xFF7C3AED)),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _LeaderTile extends StatelessWidget {
  final int rank;
  final String name;
  final int points;
  final IconData? badge;
  final Color color;

  const _LeaderTile({required this.rank, required this.name, required this.points, this.badge, required this.color});

  @override
  Widget build(BuildContext context) {
    final isMe = name == 'Tú';
    return GlassCard(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 3),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: ListTile(
        contentPadding: EdgeInsets.zero,
        leading: SizedBox(
          width: 36,
          child: badge != null
              ? Icon(badge, color: color, size: 24)
              : Text('$rank', style: TextStyle(fontWeight: FontWeight.bold, color: color, fontSize: 18)),
        ),
        title: Text(name, style: TextStyle(fontWeight: isMe ? FontWeight.bold : FontWeight.w500)),
        trailing: Text('$points pts', style: TextStyle(color: isMe ? const Color(0xFF7C3AED) : Colors.grey[500], fontWeight: FontWeight.w600)),
      ),
    );
  }
}
