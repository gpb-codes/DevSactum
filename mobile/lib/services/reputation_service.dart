import '../core/network/api_client.dart';
import '../config/constants.dart';

class ReputationService {
  final _apiGo = ApiClient(AppConstants.apiGoBase);

  Future<List<dynamic>> getLeaderboard() async {
    final data = await _apiGo.get('/reputation/leaderboard');
    return data['leaderboard'] as List;
  }
}
