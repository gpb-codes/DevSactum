import 'package:flutter/material.dart';

enum ToastType { success, error, info }

class ToastProvider extends ChangeNotifier {
  String? _message;
  ToastType _type = ToastType.info;

  String? get message => _message;
  ToastType get type => _type;

  void show(String msg, {ToastType type = ToastType.info}) {
    _message = msg;
    _type = type;
    notifyListeners();
  }

  void hide() {
    _message = null;
    notifyListeners();
  }
}

class ToastOverlay extends StatelessWidget {
  final String message;
  final ToastType type;

  const ToastOverlay({super.key, required this.message, required this.type});

  @override
  Widget build(BuildContext context) {
    final colors = switch (type) {
      ToastType.success => const Color(0xFF10B981),
      ToastType.error => const Color(0xFFEF4444),
      ToastType.info => const Color(0xFF7C3AED),
    };

    return Align(
      alignment: Alignment.topCenter,
      child: Padding(
        padding: const EdgeInsets.only(top: 60),
        child: Material(
          color: Colors.transparent,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
            decoration: BoxDecoration(
              color: colors.withValues(alpha: 0.9),
              borderRadius: BorderRadius.circular(16),
              boxShadow: [BoxShadow(color: colors.withValues(alpha: 0.3), blurRadius: 20, offset: const Offset(0, 8))],
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(_icon, color: Colors.white, size: 20),
                const SizedBox(width: 10),
                Flexible(child: Text(message, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w500))),
              ],
            ),
          ),
        ),
      ),
    );
  }

  IconData get _icon => switch (type) {
    ToastType.success => Icons.check_circle,
    ToastType.error => Icons.error,
    ToastType.info => Icons.info,
  };
}
