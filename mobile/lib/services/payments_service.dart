class PaymentsService {
  static const plans = [
    Plan(id: 'pro_monthly', name: 'Pro Monthly', price: 15.0, interval: 'month'),
    Plan(id: 'pro_yearly', name: 'Pro Yearly', price: 150.0, interval: 'year'),
    Plan(id: 'enterprise_monthly', name: 'Enterprise Monthly', price: 49.0, interval: 'month'),
    Plan(id: 'enterprise_yearly', name: 'Enterprise Yearly', price: 490.0, interval: 'year'),
  ];

  Future<Map<String, dynamic>> createOrder(String planId) async {
    await Future.delayed(const Duration(milliseconds: 1000));
    return {'orderId': 'ORD-${DateTime.now().millisecondsSinceEpoch}', 'status': 'created'};
  }

  Future<Map<String, dynamic>> captureOrder(String orderId) async {
    await Future.delayed(const Duration(milliseconds: 1000));
    return {'orderId': orderId, 'status': 'completed', 'subscriptionId': 'SUB-${DateTime.now().millisecondsSinceEpoch}'};
  }

  Future<Map<String, dynamic>> getSubscription(String subscriptionId) async {
    await Future.delayed(const Duration(milliseconds: 500));
    return {'id': subscriptionId, 'plan': 'pro_monthly', 'status': 'active', 'nextBilling': DateTime.now().add(const Duration(days: 30)).toIso8601String()};
  }
}

class Plan {
  final String id;
  final String name;
  final double price;
  final String interval;

  const Plan({required this.id, required this.name, required this.price, required this.interval});
}
