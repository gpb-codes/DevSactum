import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/nav_provider.dart';
import '../providers/notifications_provider.dart';
import '../screens/feed/feed_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/explore/explore_screen.dart';
import '../screens/saved/saved_screen.dart';
import '../screens/communities/communities_screen.dart';
import '../screens/chat/chat_screen.dart';
import '../screens/profile/profile_screen.dart';
import '../screens/notifications/notifications_screen.dart';
import '../screens/settings/settings_screen.dart';
import '../screens/jobs/job_board_screen.dart';
import '../screens/jobs/company_dashboard_screen.dart';
import '../screens/jobs/premium_screen.dart';
import '../screens/jobs/ai_tools_screen.dart';
import '../screens/jobs/postulacion_screen.dart';
import '../screens/jobs/member_pro_screen.dart';
import '../screens/jobs/recruiter_pro_screen.dart';
import '../screens/portfolio/portfolio_screen.dart';
import '../screens/freelance/freelance_screen.dart';
import '../screens/validation/validation_screen.dart';
import '../screens/reputation/reputation_screen.dart';
import '../screens/about/about_screen.dart';
import '../screens/about/contact_screen.dart';
import '../widgets/empty_state.dart';

class AppShell extends StatelessWidget {
  const AppShell({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<NavProvider>(
      builder: (context, nav, _) {
        final unread = context.watch<NotificationsProvider>().unreadCount;
        return Scaffold(
          extendBody: true,
          key: nav.scaffoldKey,
          body: _buildScreen(nav.activePage),
          drawer: nav.activePage != 'Login' ? _AppDrawer(currentPage: nav.activePage, onTap: (p) => nav.navigate(p), unread: unread) : null,
          bottomNavigationBar: nav.activePage != 'Login'
              ? _GlassBottomNav(currentPage: nav.activePage, onTap: (p) => nav.navigate(p), unread: unread)
              : null,
        );
      },
    );
  }

  Widget _buildScreen(String page) {
    switch (page) {
      case 'Feed': return const FeedScreen();
      case 'Login': return const LoginScreen();
      case 'Explorar': return const ExploreScreen();
      case 'Guardados': return const SavedScreen();
      case 'Comunidades': return const CommunitiesScreen();
      case 'Chat': return const ChatScreen();
      case 'Perfil': return const ProfileScreen();
      case 'Notificaciones': return const NotificationsScreen();
      case 'Configuración': return const SettingsScreen();
      case 'Bolsa de Empleo': return const JobBoardScreen();
      case 'Empleo Dashboard': return const CompanyDashboardScreen();
      case 'Empleo Premium': return const PremiumScreen();
      case 'Empleo IA': return const AIToolsScreen();
      case 'Postulación': return const PostulacionScreen();
      case 'Membresía Dev': return const MemberProScreen();
      case 'Membresía Reclutador': return const RecruiterProScreen();
      case 'Portafolio': return const PortfolioScreen();
      case 'Freelancing': return const FreelanceScreen();
      case 'Validación': return const ValidationScreen();
      case 'Reputación': return const ReputationScreen();
      case 'Nosotros': return const AboutScreen();
      case 'Contáctanos': return const ContactScreen();
      default: return const EmptyState(title: 'Página no encontrada');
    }
  }
}

class _AppDrawer extends StatelessWidget {
  final String currentPage;
  final ValueChanged<String> onTap;
  final int unread;

  const _AppDrawer({required this.currentPage, required this.onTap, required this.unread});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Drawer(
      width: 280,
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: isDark ? [const Color(0xFF0D0D1A), const Color(0xFF08080F)] : [const Color(0xFFF5F3FF), const Color(0xFFF8F6FF)],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              DrawerHeader(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 48, height: 48,
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(colors: [Color(0xFF7C3AED), Color(0xFF06B6D4)]),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: const Center(child: Icon(Icons.code, color: Colors.white, size: 24)),
                    ),
                    const SizedBox(height: 12),
                    const Text('DevSactum', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
                    Text('Red social para developers', style: TextStyle(color: Colors.grey[500], fontSize: 13)),
                  ],
                ),
              ),
              Expanded(
                child: ListView(
                  padding: EdgeInsets.zero,
                  children: [
                    _Section(label: 'Navegación'),
                    _NavItem(icon: Icons.explore, label: 'Feed', page: 'Feed', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.compass_calibration, label: 'Explorar', page: 'Explorar', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.work, label: 'Bolsa de Empleo', page: 'Bolsa de Empleo', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.auto_awesome, label: 'Empleo IA', page: 'Empleo IA', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.work_outline, label: 'Freelancing', page: 'Freelancing', currentPage: currentPage, onTap: onTap),
                    _Section(label: 'Tu Carrera'),
                    _NavItem(icon: Icons.folder, label: 'Portafolio', page: 'Portafolio', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.leaderboard, label: 'Reputación', page: 'Reputación', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.verified, label: 'Validación', page: 'Validación', currentPage: currentPage, onTap: onTap),
                    _Section(label: 'Comunidad'),
                    _NavItem(icon: Icons.people, label: 'Comunidades', page: 'Comunidades', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.bookmark, label: 'Guardados', page: 'Guardados', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.chat, label: 'Chat', page: 'Chat', currentPage: currentPage, onTap: onTap, badge: unread),
                    _Section(label: 'Pro'),
                    _NavItem(icon: Icons.star, label: 'Membresía Dev', page: 'Membresía Dev', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.business, label: 'Membresía Reclutador', page: 'Membresía Reclutador', currentPage: currentPage, onTap: onTap),
                    _Section(label: 'Cuenta'),
                    _NavItem(icon: Icons.person, label: 'Perfil', page: 'Perfil', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.notifications, label: 'Notificaciones', page: 'Notificaciones', currentPage: currentPage, onTap: onTap, badge: unread),
                    _NavItem(icon: Icons.settings, label: 'Configuración', page: 'Configuración', currentPage: currentPage, onTap: onTap),
                    _Section(label: 'Empresa'),
                    _NavItem(icon: Icons.info, label: 'Nosotros', page: 'Nosotros', currentPage: currentPage, onTap: onTap),
                    _NavItem(icon: Icons.mail, label: 'Contáctanos', page: 'Contáctanos', currentPage: currentPage, onTap: onTap),
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

class _Section extends StatelessWidget {
  final String label;
  const _Section({required this.label});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 4),
      child: Text(label, style: TextStyle(color: Colors.grey[500], fontSize: 11, fontWeight: FontWeight.w600, letterSpacing: 1)),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final String page;
  final String currentPage;
  final ValueChanged<String> onTap;
  final int? badge;

  const _NavItem({required this.icon, required this.label, required this.page, required this.currentPage, required this.onTap, this.badge});

  @override
  Widget build(BuildContext context) {
    final active = currentPage == page;
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 1),
      decoration: BoxDecoration(
        color: active ? const Color(0xFF7C3AED).withValues(alpha: 0.1) : null,
        borderRadius: BorderRadius.circular(10),
      ),
      child: ListTile(
        dense: true,
        leading: Icon(icon, size: 20, color: active ? const Color(0xFF7C3AED) : Colors.grey[400]),
        title: Text(label, style: TextStyle(fontSize: 14, fontWeight: active ? FontWeight.w600 : FontWeight.w400, color: active ? const Color(0xFF7C3AED) : null)),
        trailing: badge != null && badge! > 0 ? Container(
          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
          decoration: BoxDecoration(color: const Color(0xFF7C3AED), borderRadius: BorderRadius.circular(10)),
          child: Text('$badge', style: const TextStyle(color: Colors.white, fontSize: 11)),
        ) : null,
        onTap: () { onTap(page); Navigator.of(context).pop(); },
      ),
    );
  }
}

class _GlassBottomNav extends StatelessWidget {
  final String currentPage;
  final ValueChanged<String> onTap;
  final int unread;

  const _GlassBottomNav({required this.currentPage, required this.onTap, required this.unread});

  static const _tabs = [
    _TabData('Feed', Icons.explore),
    _TabData('Comunidades', Icons.people),
    _TabData('Notificaciones', Icons.notifications),
    _TabData('Chat', Icons.chat),
    _TabData('Perfil', Icons.person),
  ];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xCC0D0D1A) : const Color(0xCCFFFFFF),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: isDark ? const Color(0x2FFFFFFF) : const Color(0x2F000000), width: 0.5),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: BackdropFilter(
          filter: isDark ? (ColorFilter.mode(Colors.black.withValues(alpha: 0.5), BlendMode.srcOver)) : (ColorFilter.mode(Colors.white.withValues(alpha: 0.7), BlendMode.srcOver)),
          child: BottomNavigationBar(
            backgroundColor: Colors.transparent,
            elevation: 0,
            type: BottomNavigationBarType.fixed,
            currentIndex: _tabs.indexWhere((t) => t.page == currentPage).clamp(0, _tabs.length - 1),
            selectedItemColor: const Color(0xFF7C3AED),
            unselectedItemColor: Colors.grey[500],
            onTap: (i) => onTap(_tabs[i].page),
            items: _tabs.map((t) {
              final isNotif = t.page == 'Notificaciones';
              return BottomNavigationBarItem(
                icon: isNotif ? Badge(isLabelVisible: unread > 0, label: Text('$unread'), child: Icon(t.icon)) : Icon(t.icon),
                label: t.page,
              );
            }).toList(),
          ),
        ),
      ),
    );
  }
}

class _TabData {
  final String page;
  final IconData icon;
  const _TabData(this.page, this.icon);
}
