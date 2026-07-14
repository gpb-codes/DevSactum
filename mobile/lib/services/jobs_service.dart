import '../core/models/job.dart';
import '../core/network/api_client.dart';
import '../config/constants.dart';

class JobsService {
  final _api = ApiClient(AppConstants.apiNestjsBase);

  Future<List<JobListing>> getJobs({int page = 1}) async {
    final data = await _api.get('/jobs?page=$page');
    return (data['jobs'] as List).map((e) => JobListing.fromJson(e)).toList();
  }

  Future<JobListing> createJob(Map<String, dynamic> body) async {
    final data = await _api.post('/jobs', body: body);
    return JobListing.fromJson(data);
  }

  Future<void> apply(String jobId, String message) async {
    await _api.post('/jobs/$jobId/apply', body: {'message': message});
  }
}
