import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/theme_provider.dart';
import 'glass_card.dart';

class ThemeCustomizer extends StatelessWidget {
  const ThemeCustomizer({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = context.watch<ThemeProvider>();
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: isDark ? [const Color(0xFF0D0D1A), const Color(0xFF08080F)] : [const Color(0xFFF5F3FF), const Color(0xFFF8F6FF)],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Personalizar tema', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              IconButton(icon: const Icon(Icons.close), onPressed: () => Navigator.of(context).pop()),
            ],
          ),
          const SizedBox(height: 20),
          const Text('Modo', style: TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          _ModeSelector(theme: theme),
          const SizedBox(height: 20),
          const Text('Color acento', style: TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          _AccentPicker(theme: theme),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Modo compacto', style: TextStyle(fontWeight: FontWeight.w600)),
              Switch(value: theme.compactMode, onChanged: (_) => theme.toggleCompact(), activeTrackColor: theme.accentColor),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Efecto glass', style: TextStyle(fontWeight: FontWeight.w600)),
              Switch(value: theme.glassEffect, onChanged: (_) => theme.toggleGlass(), activeTrackColor: theme.accentColor),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Reducir movimiento', style: TextStyle(fontWeight: FontWeight.w600)),
              Switch(value: theme.reduceMotion, onChanged: (_) => theme.toggleReduceMotion(), activeTrackColor: theme.accentColor),
            ],
          ),
          const SizedBox(height: 20),
          const Text('Tamaño de fuente', style: TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          Slider(
            value: theme.fontSize,
            min: 0.8,
            max: 1.4,
            divisions: 6,
            label: '${(theme.fontSize * 100).toInt()}%',
            activeColor: theme.accentColor,
            onChanged: (v) => theme.setFontSize(v),
          ),
        ],
      ),
    );
  }
}

class _ModeSelector extends StatelessWidget {
  final ThemeProvider theme;
  const _ModeSelector({required this.theme});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        _ModeChip(label: 'Oscuro', selected: theme.mode == ThemeMode.dark, onTap: () => theme.setMode(ThemeMode.dark)),
        const SizedBox(width: 8),
        _ModeChip(label: 'Claro', selected: theme.mode == ThemeMode.light, onTap: () => theme.setMode(ThemeMode.light)),
        const SizedBox(width: 8),
        _ModeChip(label: 'Sistema', selected: theme.mode == ThemeMode.system, onTap: () => theme.setMode(ThemeMode.system)),
      ],
    );
  }
}

class _ModeChip extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;
  const _ModeChip({required this.label, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: selected ? const Color(0xFF7C3AED) : Colors.white12,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Text(label, style: TextStyle(color: selected ? Colors.white : null, fontWeight: FontWeight.w600, fontSize: 13)),
      ),
    );
  }
}

class _AccentPicker extends StatelessWidget {
  final ThemeProvider theme;
  const _AccentPicker({required this.theme});

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: ThemeProvider.accentColors.map((c) {
        final selected = c.toARGB32() == theme.accentColor.toARGB32();
        return GestureDetector(
          onTap: () => theme.setAccentColor(c),
          child: Container(
            width: 36, height: 36,
            decoration: BoxDecoration(
              color: c,
              shape: BoxShape.circle,
              border: selected ? Border.all(color: Colors.white, width: 2) : null,
              boxShadow: selected ? [BoxShadow(color: c.withValues(alpha: 0.5), blurRadius: 12)] : null,
            ),
            child: selected ? const Icon(Icons.check, color: Colors.white, size: 18) : null,
          ),
        );
      }).toList(),
    );
  }
}

class ThemeCustomizerModal extends StatelessWidget {
  const ThemeCustomizerModal({super.key});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.all(16),
      child: GlassCard(
        padding: EdgeInsets.zero,
        borderRadius: 24,
        child: const ThemeCustomizer(),
      ),
    );
  }
}
