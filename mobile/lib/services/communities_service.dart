import '../core/models/community.dart';
import '../core/network/api_client.dart';
import '../config/constants.dart';

class CommunitiesService {
  final _apiGo = ApiClient(AppConstants.apiGoBase);

  Future<List<Community>> getAll() async {
    final data = await _apiGo.get('/communities');
    return (data['communities'] as List).map((e) => Community.fromJson(e)).toList();
  }

  Future<void> join(String id) async {
    await _apiGo.post('/communities/$id/join');
  }

  Future<Community> create(Map<String, dynamic> body) async {
    final data = await _apiGo.post('/communities', body: body);
    return Community.fromJson(data);
  }
}
