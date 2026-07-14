import 'package:flutter/material.dart';
import '../../widgets/glass_card.dart';

class MemberProScreen extends StatelessWidget {
  const MemberProScreen({super.key});

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
                padding: EdgeInsets.fromLTRB(20, 20, 20, 8),
                child: Text('Membresía Dev', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
                child: Text('Lleva tu carrera al siguiente nivel', style: TextStyle(color: Colors.grey[500], fontSize: 14)),
              ),
              Expanded(
                child: ListView(
                  padding: const EdgeInsets.only(bottom: 80),
                  children: [
                    _PlanCard(
                      name: 'Starter',
                      price: 'Gratis',
                      features: ['Perfil básico', 'Feed social', 'Comunidades', 'Chat'],
                      popular: false,
                      color: const Color(0xFF94A3B8),
                    ),
                    _PlanCard(
                      name: 'System Architect',
                      price: '\$15/mes',
                      features: ['Perfil destacado', 'Matches con IA', 'Analíticas', 'Badge verificado', 'Prioridad en búsquedas'],
                      popular: true,
                      color: const Color(0xFF7C3AED),
                    ),
                    _PlanCard(
                      name: 'Enterprise',
                      price: '\$29/mes',
                      features: ['Todo lo de Architect', 'API access', 'Soporte prioritario', 'Exportación de datos', 'Team features'],
                      popular: false,
                      color: const Color(0xFF3B82F6),
                    ),
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

class _PlanCard extends StatelessWidget {
  final String name;
  final String price;
  final List<String> features;
  final bool popular;
  final Color color;

  const _PlanCard({required this.name, required this.price, required this.features, required this.popular, required this.color});

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(name, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: popular ? color : null)),
              if (popular)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(color: color.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(12)),
                  child: Text('Popular', style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w600)),
                ),
            ],
          ),
          const SizedBox(height: 8),
          Text(price, style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: popular ? color : Colors.grey[300])),
          const SizedBox(height: 16),
          ...features.map((f) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                Icon(Icons.check_circle, color: color, size: 18),
                const SizedBox(width: 8),
                Text(f, style: const TextStyle(fontSize: 14)),
              ],
            ),
          )),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: popular ? color : Colors.white12,
                foregroundColor: popular ? Colors.white : Colors.grey[300],
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
              child: Text(popular ? 'Suscribirse' : 'Más info', style: const TextStyle(fontWeight: FontWeight.w600)),
            ),
          ),
        ],
      ),
    );
  }
}
