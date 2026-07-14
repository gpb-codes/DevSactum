class AIService {
  static const _mockMatches = [
    {'jobId': '1', 'score': 0.92, 'reason': 'Perfect match: 5+ years Flutter experience aligns with Senior role'},
    {'jobId': '2', 'score': 0.78, 'reason': 'Strong match: React Native experience transferable'},
    {'jobId': '3', 'score': 0.85, 'reason': 'Good match: Backend architecture skills detected'},
  ];

  Future<List<Map<String, dynamic>>> getJobMatches(String userId) async {
    await Future.delayed(const Duration(milliseconds: 800));
    return _mockMatches;
  }

  Future<Map<String, dynamic>> analyzeResume(String resumeText) async {
    await Future.delayed(const Duration(milliseconds: 1200));
    return {
      'score': 82,
      'strengths': ['Experiencia en Flutter', 'Arquitectura limpia', 'Metodologías ágiles'],
      'gaps': ['Falta experiencia en Go', 'Mejorar DevOps skills'],
      'suggestions': ['Considera certificación en AWS', 'Añade proyectos open source'],
    };
  }

  Future<Map<String, dynamic>> getSkillGap(String userId) async {
    await Future.delayed(const Duration(milliseconds: 600));
    return {
      'currentSkills': ['Flutter', 'Dart', 'TypeScript', 'Firebase'],
      'gaps': [
        {'skill': 'Go', 'demand': 0.85, 'resources': ['Tour of Go', 'Go by Example']},
        {'skill': 'Kubernetes', 'demand': 0.78, 'resources': ['Kubernetes Basics', 'CKAD prep']},
      ],
      'marketTrends': ['Flutter creciendo 40% YoY', 'Go + IA = alta demanda'],
    };
  }

  Future<List<Map<String, dynamic>>> getMarketInsights() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return [
      {'tech': 'Flutter', 'growth': 40, 'avgSalary': 85000},
      {'tech': 'Go', 'growth': 35, 'avgSalary': 95000},
      {'tech': 'Rust', 'growth': 50, 'avgSalary': 105000},
    ];
  }
}
