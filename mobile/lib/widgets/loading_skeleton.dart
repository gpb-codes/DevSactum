import 'package:flutter/material.dart';

class LoadingSkeleton extends StatelessWidget {
  final int itemCount;

  const LoadingSkeleton({super.key, this.itemCount = 3});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: itemCount,
      padding: const EdgeInsets.all(16),
      itemBuilder: (_, _) => Card(
        margin: const EdgeInsets.only(bottom: 12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    width: 40, height: 40,
                    decoration: const BoxDecoration(shape: BoxShape.circle, color: Colors.white12),
                  ),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(width: 100, height: 12, decoration: BoxDecoration(color: Colors.white12, borderRadius: BorderRadius.circular(4))),
                      const SizedBox(height: 4),
                      Container(width: 60, height: 10, decoration: BoxDecoration(color: Colors.white12, borderRadius: BorderRadius.circular(4))),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Container(width: double.infinity, height: 14, decoration: BoxDecoration(color: Colors.white12, borderRadius: BorderRadius.circular(4))),
              const SizedBox(height: 8),
              Container(width: 200, height: 14, decoration: BoxDecoration(color: Colors.white12, borderRadius: BorderRadius.circular(4))),
            ],
          ),
        ),
      ),
    );
  }
}
