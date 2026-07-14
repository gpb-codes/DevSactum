import 'package:flutter/material.dart';
import '../../widgets/glass_card.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

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
                child: Text('Nosotros', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
              ),
              Expanded(
                child: ListView(
                  padding: const EdgeInsets.only(bottom: 80),
                  children: [
                    GlassCard(
                      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                      padding: const EdgeInsets.all(32),
                      child: Column(
                        children: [
                          Container(
                            width: 80, height: 80,
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(colors: [Color(0xFF7C3AED), Color(0xFF3B82F6)]),
                              borderRadius: BorderRadius.circular(24),
                            ),
                            child: const Center(child: Icon(Icons.code, color: Colors.white, size: 40)),
                          ),
                          const SizedBox(height: 20),
                          const Text('DevSactum', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
                          const SizedBox(height: 12),
                          Text(
                            'Plataforma social para desarrolladores. Construye tu perfil técnico, comparte código, únete a comunidades y gana reputación.',
                            textAlign: TextAlign.center,
                            style: TextStyle(fontSize: 15, color: Colors.grey[400], height: 1.6),
                          ),
                        ],
                      ),
                    ),
                    _InfoTile(icon: Icons.people, title: 'Fundado 2025', subtitle: 'Por y para developers'),
                    _InfoTile(icon: Icons.public, title: 'Comunidad global', subtitle: '+10,000 desarrolladores activos'),
                    _InfoTile(icon: Icons.rocket_launch, title: 'Open Source', subtitle: 'Construido con tecnología abierta'),
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

class _InfoTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const _InfoTile({required this.icon, required this.title, required this.subtitle});

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
      child: ListTile(
        contentPadding: EdgeInsets.zero,
        leading: Container(
          width: 44, height: 44,
          decoration: BoxDecoration(color: const Color(0xFF7C3AED).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(12)),
          child: const Icon(Icons.info, color: Color(0xFF7C3AED)),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 13)),
      ),
    );
  }
}
