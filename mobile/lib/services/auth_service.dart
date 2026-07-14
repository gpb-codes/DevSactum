import '../core/models/user.dart';
import '../core/network/api_client.dart';
import '../config/constants.dart';

class AuthService {
  final _api = ApiClient(AppConstants.apiNestjsBase);

  Future<AuthUser> login(String email, String password) async {
    final data = await _api.post('/auth/login', body: {
      'email': email,
      'password': password,
    });
    return AuthUser.fromJson(data);
  }

  Future<AuthUser> register(String name, String email, String password, String role) async {
    final data = await _api.post('/auth/register', body: {
      'name': name,
      'email': email,
      'password': password,
      'role': role,
    });
    return AuthUser.fromJson(data);
  }
}
