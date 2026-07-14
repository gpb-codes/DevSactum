import 'package:flutter/material.dart';
import '../../core/models/job.dart';
import '../../widgets/glass_card.dart';

class JobBoardScreen extends StatelessWidget {
  const JobBoardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final jobs = _mockJobs();

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: Theme.of(context).brightness == Brightness.dark
                ? [const Color(0xFF0D0D1A), const Color(0xFF08080F)]
                : [const Color(0xFFF5F3FF), const Color(0xFFF8F6FF)],
          ),
        ),
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Padding(
                padding: EdgeInsets.fromLTRB(20, 20, 20, 8),
                child: Text('Bolsa de Empleo', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
                child: Text('${jobs.length} ofertas disponibles', style: TextStyle(color: Colors.grey[500], fontSize: 14)),
              ),
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.only(bottom: 80),
                  itemCount: jobs.length,
                  itemBuilder: (_, i) => _JobCard(job: jobs[i]),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  List<JobListing> _mockJobs() => [
    JobListing(id: '1', title: 'Senior Flutter Developer', companyName: 'TechCorp', location: 'Remoto', remote: true, type: 'full-time', experience: 'senior', salaryMin: 60000, salaryMax: 90000),
    JobListing(id: '2', title: 'React Native Dev', companyName: 'StartupXYZ', location: 'Santiago', remote: false, type: 'full-time', experience: 'mid', salaryMin: 35000, salaryMax: 55000),
    JobListing(id: '3', title: 'Backend Go Developer', companyName: 'CloudBase', location: 'Remoto', remote: true, type: 'contract', experience: 'senior', salaryMin: 70000, salaryMax: 100000),
  ];
}

class _JobCard extends StatelessWidget {
  final JobListing job;

  const _JobCard({required this.job});

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
      child: ListTile(
        contentPadding: EdgeInsets.zero,
        leading: Container(
          width: 48, height: 48,
          decoration: BoxDecoration(
            gradient: const LinearGradient(colors: [Color(0xFF10B981), Color(0xFF06B6D4)]),
            borderRadius: BorderRadius.circular(14),
          ),
          child: Center(child: Text(job.companyName[0], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18))),
        ),
        title: Text(job.title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(job.companyName, style: TextStyle(color: Colors.grey[500], fontSize: 13)),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            if (job.salaryMax > 0)
              Text('\$${(job.salaryMin / 1000).toStringAsFixed(0)}k-\$${(job.salaryMax / 1000).toStringAsFixed(0)}k', style: const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.w600, fontSize: 13)),
            const SizedBox(height: 4),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                _Chip(job.remote ? 'Remoto' : job.location),
                const SizedBox(width: 4),
                _Chip(job.type),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _Chip extends StatelessWidget {
  final String label;
  const _Chip(this.label);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(color: Colors.white10, borderRadius: BorderRadius.circular(6)),
      child: Text(label, style: const TextStyle(fontSize: 10)),
    );
  }
}
