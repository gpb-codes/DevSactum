import 'package:flutter/material.dart';
import '../../widgets/glass_card.dart';

class SavedScreen extends StatelessWidget {
  const SavedScreen({super.key});

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
                child: Text('Guardados', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
              ),
              Expanded(
                child: ListView(
                  padding: const EdgeInsets.only(bottom: 80),
                  children: [
                    _SavedItem(title: 'Guía de Arquitectura Clean', desc: 'Principios y patrones', tag: 'Arquitectura', color: const Color(0xFF7C3AED)),
                    _SavedItem(title: 'Roadmap Flutter 2025', desc: 'Hoja de ruta completa', tag: 'Flutter', color: const Color(0xFF06B6D4)),
                    _SavedItem(title: 'Best Practices Go', desc: 'Convenciones y tips', tag: 'Go', color: const Color(0xFF10B981)),
                    _SavedItem(title: 'Sistema de Diseño', desc: 'Componentes y tokens', tag: 'Design', color: const Color(0xFFF59E0B)),
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

class _SavedItem extends StatelessWidget {
  final String title;
  final String desc;
  final String tag;
  final Color color;

  const _SavedItem({required this.title, required this.desc, required this.tag, required this.color});

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: ListTile(
        contentPadding: EdgeInsets.zero,
        leading: Container(
          width: 44, height: 44,
          decoration: BoxDecoration(color: color.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(12)),
          child: Icon(Icons.bookmark, color: color),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(desc, style: TextStyle(color: Colors.grey[500], fontSize: 13)),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(color: color.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(8)),
          child: Text(tag, style: TextStyle(color: color, fontSize: 11)),
        ),
      ),
    );
  }
}
