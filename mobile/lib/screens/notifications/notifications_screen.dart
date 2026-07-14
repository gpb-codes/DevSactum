import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/notifications_provider.dart';
import '../../widgets/glass_card.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final notifProvider = context.watch<NotificationsProvider>();

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
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('Notificaciones', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
                    if (notifProvider.unreadCount > 0)
                      TextButton(onPressed: () => notifProvider.markAllRead(), child: const Text('Leer todo', style: TextStyle(color: Color(0xFF7C3AED)))),
                  ],
                ),
              ),
              if (notifProvider.unreadCount > 0)
                Padding(
                  padding: const EdgeInsets.fromLTRB(20, 0, 20, 8),
                  child: Text('${notifProvider.unreadCount} sin leer', style: TextStyle(color: Colors.grey[500], fontSize: 14)),
                ),
              Expanded(
                child: notifProvider.notifications.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.notifications_none, size: 64, color: Colors.grey[700]),
                            const SizedBox(height: 16),
                            Text('Sin notificaciones', style: TextStyle(color: Colors.grey[500], fontSize: 18)),
                          ],
                        ),
                      )
                    : ListView.builder(
                        padding: const EdgeInsets.only(bottom: 80),
                        itemCount: notifProvider.notifications.length,
                        itemBuilder: (_, i) {
                          final n = notifProvider.notifications[i];
                          return GlassCard(
                            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                            child: ListTile(
                              contentPadding: EdgeInsets.zero,
                              leading: Container(
                                width: 44, height: 44,
                                decoration: BoxDecoration(
                                  color: n.read ? Colors.grey[800] : const Color(0xFF7C3AED).withValues(alpha: 0.2),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Center(child: Text(n.actorName[0], style: TextStyle(color: n.read ? Colors.grey[500] : const Color(0xFF7C3AED), fontWeight: FontWeight.bold))),
                              ),
                              title: Text('${n.actorName} te dio ${_actionText(n.type)}', style: TextStyle(fontSize: 14, fontWeight: n.read ? FontWeight.normal : FontWeight.w600)),
                              subtitle: n.postPreview != null ? Text(n.postPreview!, style: TextStyle(color: Colors.grey[500], fontSize: 12)) : null,
                              trailing: n.read
                                  ? null
                                  : Container(width: 8, height: 8, decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0xFF7C3AED))),
                            ),
                          );
                        },
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _actionText(String type) {
    switch (type) {
      case 'like': return 'like';
      case 'comment': return 'comentó';
      case 'follow': return 'siguió';
      default: return type;
    }
  }
}
