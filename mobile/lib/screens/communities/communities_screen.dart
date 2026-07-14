import 'package:flutter/material.dart';
import '../../widgets/glass_card.dart';
import '../../widgets/empty_state.dart';
import '../../core/models/community.dart';

class CommunitiesScreen extends StatelessWidget {
  const CommunitiesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final communities = _mockCommunities();

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
                child: Text('Comunidades', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
                child: Text('${communities.length} comunidades activas', style: TextStyle(color: Colors.grey[500], fontSize: 14)),
              ),
              Expanded(
                child: communities.isEmpty
                    ? const EmptyState(icon: Icons.people, title: 'Sin comunidades', subtitle: 'Únete a una comunidad')
                    : ListView.builder(
                        padding: const EdgeInsets.only(bottom: 80),
                        itemCount: communities.length,
                        itemBuilder: (_, i) => GlassCard(
                          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                          child: ListTile(
                            contentPadding: EdgeInsets.zero,
                            leading: Container(
                              width: 48, height: 48,
                              decoration: BoxDecoration(
                                gradient: const LinearGradient(colors: [Color(0xFF7C3AED), Color(0xFF06B6D4)]),
                                borderRadius: BorderRadius.circular(14),
                              ),
                              child: Center(child: Text(communities[i].badge?[0] ?? '?', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18))),
                            ),
                            title: Text(communities[i].name, style: const TextStyle(fontWeight: FontWeight.w600)),
                            subtitle: Text(
                              '${communities[i].members} miembros · ${communities[i].online} online',
                              style: TextStyle(color: Colors.grey[500], fontSize: 12),
                            ),
                            trailing: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: const Color(0xFF7C3AED).withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: const Text('Unirme', style: TextStyle(color: Color(0xFF7C3AED), fontSize: 12, fontWeight: FontWeight.w600)),
                            ),
                          ),
                        ),
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  List<Community> _mockCommunities() => [
    Community(id: '1', name: 'Flutter Devs', badge: 'Flutter', description: 'Comunidad de desarrollo Flutter', members: 1234, online: 42),
    Community(id: '2', name: 'React Masters', badge: 'React', description: 'Expertos en React y Next.js', members: 856, online: 28),
    Community(id: '3', name: 'Backend Army', badge: 'API', description: 'Go, Node, Python... todo backend', members: 2100, online: 67),
    Community(id: '4', name: 'AI Engineers', badge: 'AI', description: 'Inteligencia artificial y ML', members: 1500, online: 55),
    Community(id: '5', name: 'UI/UX Design', badge: 'UX', description: 'Diseño de interfaces y experiencia', members: 720, online: 18),
  ];
}
