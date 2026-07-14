import 'package:flutter/material.dart';

class NavProvider extends ChangeNotifier {
  String _activePage = 'Feed';
  final List<NavItem> _history = [];
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

  String get activePage => _activePage;

  void navigate(String page) {
    if (page == _activePage) return;
    _history.add(NavItem(_activePage));
    _activePage = page;
    notifyListeners();
  }

  void goBack() {
    if (_history.isNotEmpty) {
      _activePage = _history.removeLast().page;
      notifyListeners();
    }
  }

  void openDrawer() {
    scaffoldKey.currentState?.openDrawer();
  }
}

class NavItem {
  final String page;
  NavItem(this.page);
}
