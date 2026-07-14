import '../core/network/api_client.dart';
import '../config/constants.dart';

class MessagesService {
  final _api = ApiClient(AppConstants.apiNestjsBase);

  Future<void> sendMessage(String receiverId, String text) async {
    await _api.post('/messages', body: {
      'receiverId': receiverId,
      'text': text,
    });
  }

  Future<List<dynamic>> getUnread(String userId) async {
    final data = await _api.get('/messages/unread/$userId');
    return data['messages'] as List;
  }
}
