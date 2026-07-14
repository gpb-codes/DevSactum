import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/nav_provider.dart';
import '../widgets/glass_card.dart';

class SearchOverlay extends StatefulWidget {
  const SearchOverlay({super.key});

  @override
  State<SearchOverlay> createState() => _SearchOverlayState();
}

class _SearchOverlayState extends State<SearchOverlay> {
  final _controller = TextEditingController();
  final _focusNode = FocusNode();
  List<_SearchResult> _results = [];
  static final _allPages = <_SearchResult>[
    _SearchResult('Feed', Icons.explore, 'Navegación'),
    _SearchResult('Explorar', Icons.compass_calibration, 'Navegación'),
    _SearchResult('Bolsa de Empleo', Icons.work, 'Navegación'),
    _SearchResult('Empleo IA', Icons.auto_awesome, 'Navegación'),
    _SearchResult('Freelancing', Icons.work_outline, 'Navegación'),
    _SearchResult('Portafolio', Icons.folder, 'Tu Carrera'),
    _SearchResult('Reputación', Icons.leaderboard, 'Tu Carrera'),
    _SearchResult('Validación', Icons.verified, 'Tu Carrera'),
    _SearchResult('Comunidades', Icons.people, 'Comunidad'),
    _SearchResult('Guardados', Icons.bookmark, 'Comunidad'),
    _SearchResult('Chat', Icons.chat, 'Comunidad'),
    _SearchResult('Membresía Dev', Icons.star, 'Pro'),
    _SearchResult('Membresía Reclutador', Icons.business, 'Pro'),
    _SearchResult('Perfil', Icons.person, 'Cuenta'),
    _SearchResult('Notificaciones', Icons.notifications, 'Cuenta'),
    _SearchResult('Configuración', Icons.settings, 'Cuenta'),
    _SearchResult('Nosotros', Icons.info, 'Empresa'),
    _SearchResult('Contáctanos', Icons.mail, 'Empresa'),
  ];

  @override
  void initState() {
    super.initState();
    _focusNode.requestFocus();
    _controller.addListener(_onSearch);
    _results = _allPages;
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  void _onSearch() {
    final q = _controller.text.toLowerCase();
    setState(() {
      _results = q.isEmpty
          ? _allPages
          : _allPages.where((r) => r.label.toLowerCase().contains(q)).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: Container(
        padding: const EdgeInsets.only(top: 60),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: GlassCard(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                borderRadius: 16,
                child: TextField(
                  controller: _controller,
                  focusNode: _focusNode,
                  decoration: const InputDecoration(
                    hintText: 'Buscar páginas...',
                    prefixIcon: Icon(Icons.search, size: 20),
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                    filled: false,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: _results.map((r) => _SearchTile(result: r, onTap: () {
                  context.read<NavProvider>().navigate(r.label);
                  Navigator.of(context).pop();
                })).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SearchResult {
  final String label;
  final IconData icon;
  final String section;
  const _SearchResult(this.label, this.icon, this.section);
}

class _SearchTile extends StatelessWidget {
  final _SearchResult result;
  final VoidCallback onTap;

  const _SearchTile({required this.result, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      margin: const EdgeInsets.symmetric(vertical: 3),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      child: ListTile(
        contentPadding: EdgeInsets.zero,
        dense: true,
        leading: Icon(result.icon, size: 20, color: const Color(0xFF7C3AED)),
        title: Text(result.label, style: const TextStyle(fontSize: 14)),
        subtitle: Text(result.section, style: TextStyle(color: Colors.grey[500], fontSize: 11)),
        onTap: onTap,
      ),
    );
  }
}

Future<void> showSearchOverlay(BuildContext context) {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    barrierColor: Colors.black54,
    builder: (_) => const SizedBox(height: 500, child: SearchOverlay()),
  );
}
