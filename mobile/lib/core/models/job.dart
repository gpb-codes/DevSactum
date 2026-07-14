class JobListing {
  final String id;
  final String title;
  final String companyName;
  final String location;
  final bool remote;
  final String type; // full-time, part-time, contract, freelance, internship
  final String experience;
  final double salaryMin;
  final double salaryMax;
  final String? description;
  final DateTime createdAt;

  JobListing({
    required this.id,
    required this.title,
    required this.companyName,
    this.location = '',
    this.remote = false,
    this.type = 'full-time',
    this.experience = 'junior',
    this.salaryMin = 0,
    this.salaryMax = 0,
    this.description,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();

  factory JobListing.fromJson(Map<String, dynamic> json) => JobListing(
    id: json['id'],
    title: json['title'],
    companyName: json['companyName'],
    location: json['location'] ?? '',
    remote: json['remote'] ?? false,
    type: json['type'] ?? 'full-time',
    experience: json['experience'] ?? 'junior',
    salaryMin: (json['salaryMin'] ?? 0).toDouble(),
    salaryMax: (json['salaryMax'] ?? 0).toDouble(),
    description: json['description'],
    createdAt: DateTime.tryParse(json['createdAt'] ?? ''),
  );
}

class JobApplication {
  final String id;
  final String jobId;
  final String developerId;
  final String developerName;
  final String status;

  JobApplication({
    required this.id,
    required this.jobId,
    required this.developerId,
    required this.developerName,
    this.status = 'pending',
  });
}
