import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/theme_provider.dart';
import '../../widgets/glass_card.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = context.watch<ThemeProvider>();

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
                child: Text('Configuración', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
              ),
              _SettingTile(
                icon: Icons.dark_mode,
                title: 'Modo oscuro',
                subtitle: themeProvider.isDark ? 'Oscuro' : 'Claro',
                trailing: Switch(
                  value: themeProvider.isDark,
                  onChanged: (_) => themeProvider.toggleMode(),
                  activeTrackColor: const Color(0xFF7C3AED),
                ),
              ),
              _SettingTile(icon: Icons.notifications, title: 'Notificaciones', subtitle: 'Push, email y más', trailing: Icon(Icons.chevron_right, color: Colors.grey[600])),
              _SettingTile(icon: Icons.language, title: 'Idioma', subtitle: 'Español', trailing: Icon(Icons.chevron_right, color: Colors.grey[600])),
              _SettingTile(icon: Icons.security, title: 'Privacidad', subtitle: 'Seguridad de cuenta', trailing: Icon(Icons.chevron_right, color: Colors.grey[600])),
              _SettingTile(icon: Icons.info, title: 'Acerca de', subtitle: 'Versión 1.0.0', trailing: Icon(Icons.chevron_right, color: Colors.grey[600])),
            ],
          ),
        ),
      ),
    );
  }
}

class _SettingTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final Widget trailing;

  const _SettingTile({required this.icon, required this.title, required this.subtitle, required this.trailing});

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: ListTile(
        contentPadding: EdgeInsets.zero,
        leading: Container(
          width: 40, height: 40,
          decoration: BoxDecoration(color: const Color(0xFF7C3AED).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(10)),
          child: Icon(icon, color: const Color(0xFF7C3AED), size: 20),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 12)),
        trailing: trailing,
      ),
    );
  }
}
