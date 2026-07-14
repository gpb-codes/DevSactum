import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:devsactum/app.dart';
import 'package:devsactum/providers/nav_provider.dart';
import 'package:devsactum/providers/auth_provider.dart';
import 'package:devsactum/providers/theme_provider.dart';
import 'package:devsactum/providers/notifications_provider.dart';

void main() {
  testWidgets('App renders', (WidgetTester tester) async {
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => NavProvider()),
          ChangeNotifierProvider(create: (_) => AuthProvider()),
          ChangeNotifierProvider(create: (_) => ThemeProvider()),
          ChangeNotifierProvider(create: (_) => NotificationsProvider()),
        ],
        child: const DevsactumApp(),
      ),
    );
    expect(find.text('DevSactum'), findsOneWidget);
  });
}
