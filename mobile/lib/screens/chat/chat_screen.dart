import 'package:flutter/material.dart';
import '../../widgets/glass_card.dart';

class ChatScreen extends StatelessWidget {
  const ChatScreen({super.key});

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
                child: Text('Chat', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
              ),
              _ContactTile(name: 'Ana García', lastMsg: 'Gracias por tu ayuda!', time: '2m', online: true),
              _ContactTile(name: 'Carlos López', lastMsg: 'Revisa el PR que te envié', time: '15m', online: true),
              _ContactTile(name: 'María Torres', lastMsg: 'Está bien, lo ajusto', time: '1h', online: false),
              _ContactTile(name: 'Pedro Ramírez', lastMsg: 'Nos vemos en el meetup', time: '3h', online: false),
            ],
          ),
        ),
      ),
    );
  }
}

class _ContactTile extends StatelessWidget {
  final String name;
  final String lastMsg;
  final String time;
  final bool online;

  const _ContactTile({required this.name, required this.lastMsg, required this.time, required this.online});

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: ListTile(
        contentPadding: EdgeInsets.zero,
        leading: Stack(
          children: [
            Container(
              width: 48, height: 48,
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [Color(0xFF7C3AED), Color(0xFF3B82F6)]),
                borderRadius: BorderRadius.circular(14),
              ),
              child: Center(child: Text(name[0], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18))),
            ),
            if (online)
              Positioned(
                bottom: 0, right: 0,
                child: Container(width: 12, height: 12, decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle, border: Border.fromBorderSide(BorderSide(color: Colors.black, width: 2)))),
              ),
          ],
        ),
        title: Text(name, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(lastMsg, style: TextStyle(color: Colors.grey[500], fontSize: 13)),
        trailing: Text(time, style: TextStyle(color: Colors.grey[500], fontSize: 12)),
      ),
    );
  }
}
