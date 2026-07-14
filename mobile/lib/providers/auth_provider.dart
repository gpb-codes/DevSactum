import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/models/user.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService = AuthService();
  User? _user;
  String? _token;
  bool _loading = false;
  String? _error;

  User? get user => _user;
  String? get token => _token;
  bool get isAuthenticated => _user != null && _token != null;
  bool get loading => _loading;
  String? get error => _error;

  Future<void> login(String email, String password) async {
    _loading = true;
    _error = null;
    notifyListeners();

    try {
      final authUser = await _authService.login(email, password);
      _user = authUser.user;
      _token = authUser.token;
      await _persist();
    } catch (e) {
      _error = e.toString();
    }

    _loading = false;
    notifyListeners();
  }

  Future<void> register(String name, String email, String password, String role) async {
    _loading = true;
    _error = null;
    notifyListeners();

    try {
      final authUser = await _authService.register(name, email, password, role);
      _user = authUser.user;
      _token = authUser.token;
      await _persist();
    } catch (e) {
      _error = e.toString();
    }

    _loading = false;
    notifyListeners();
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    if (_token != null) await prefs.setString('ds-token', _token!);
  }

  void logout() {
    _user = null;
    _token = null;
    notifyListeners();
  }
}
