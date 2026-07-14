import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ThemeProvider extends ChangeNotifier {
  ThemeMode _mode = ThemeMode.dark;
  Color _accentColor = const Color(0xFF7C3AED);
  double _fontSize = 1.0;
  bool _compactMode = false;
  bool _glassEffect = true;
  bool _reduceMotion = false;

  ThemeMode get mode => _mode;
  Color get accentColor => _accentColor;
  double get fontSize => _fontSize;
  bool get isDark => _mode == ThemeMode.dark;
  bool get compactMode => _compactMode;
  bool get glassEffect => _glassEffect;
  bool get reduceMotion => _reduceMotion;

  static const _accents = {
    'purple': Color(0xFF7C3AED),
    'cyan': Color(0xFF06B6D4),
    'orange': Color(0xFFF97316),
    'green': Color(0xFF10B981),
    'red': Color(0xFFEF4444),
    'blue': Color(0xFF3B82F6),
    'pink': Color(0xFFEC4899),
  };

  static const List<String> accentNames = ['purple', 'cyan', 'orange', 'green', 'red', 'blue', 'pink'];
  static const List<Color> accentColors = [
    Color(0xFF7C3AED), Color(0xFF06B6D4), Color(0xFFF97316),
    Color(0xFF10B981), Color(0xFFEF4444), Color(0xFF3B82F6), Color(0xFFEC4899),
  ];

  ThemeProvider() {
    _load();
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final modeStr = prefs.getString('ds-theme-mode') ?? 'dark';
    _mode = modeStr == 'system' ? ThemeMode.system : (modeStr == 'light' ? ThemeMode.light : ThemeMode.dark);
    final accentStr = prefs.getString('ds-accent') ?? 'purple';
    _accentColor = _accents[accentStr] ?? const Color(0xFF7C3AED);
    _fontSize = prefs.getDouble('ds-font-size') ?? 1.0;
    _compactMode = prefs.getBool('ds-compact') ?? false;
    _glassEffect = prefs.getBool('ds-glass') ?? true;
    _reduceMotion = prefs.getBool('ds-reduce-motion') ?? false;
    notifyListeners();
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    String modeStr;
    switch (_mode) {
      case ThemeMode.system: modeStr = 'system'; break;
      case ThemeMode.light: modeStr = 'light'; break;
      default: modeStr = 'dark';
    }
    await prefs.setString('ds-theme-mode', modeStr);
    await prefs.setString('ds-accent', _accents.entries.firstWhere((e) => e.value == _accentColor).key);
    await prefs.setDouble('ds-font-size', _fontSize);
    await prefs.setBool('ds-compact', _compactMode);
    await prefs.setBool('ds-glass', _glassEffect);
    await prefs.setBool('ds-reduce-motion', _reduceMotion);
  }

  Future<void> setMode(ThemeMode mode) async { _mode = mode; await _save(); notifyListeners(); }
  Future<void> toggleMode() async { _mode = isDark ? ThemeMode.light : ThemeMode.dark; await _save(); notifyListeners(); }
  Future<void> setAccentColor(Color color) async { _accentColor = color; await _save(); notifyListeners(); }
  Future<void> setFontSize(double size) async { _fontSize = size; await _save(); notifyListeners(); }
  Future<void> toggleCompact() async { _compactMode = !_compactMode; await _save(); notifyListeners(); }
  Future<void> toggleGlass() async { _glassEffect = !_glassEffect; await _save(); notifyListeners(); }
  Future<void> toggleReduceMotion() async { _reduceMotion = !_reduceMotion; await _save(); notifyListeners(); }
}
