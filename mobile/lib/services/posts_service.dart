import '../core/models/post.dart';
import '../core/network/api_client.dart';
import '../config/constants.dart';

class PostsService {
  final _apiGo = ApiClient(AppConstants.apiGoBase);
  final _apiNestjs = ApiClient(AppConstants.apiNestjsBase);

  Future<List<Post>> getFeed({int page = 1}) async {
    final data = await _apiGo.get('/posts?page=$page');
    return (data['posts'] as List).map((e) => Post.fromJson(e)).toList();
  }

  Future<Post> createPost(String text, {String? code, List<String>? tags}) async {
    final data = await _apiGo.post('/posts', body: {
      'text': text,
      'code': code,
      'tags': tags,
    });
    return Post.fromJson(data);
  }

  Future<void> likePost(String id) async {
    await _apiGo.post('/posts/$id/like');
  }

  Future<List<Post>> getByTag(String tag) async {
    final data = await _apiNestjs.get('/posts/tag/$tag');
    return (data['posts'] as List).map((e) => Post.fromJson(e)).toList();
  }
}
