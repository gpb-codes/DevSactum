import 'package:flutter/material.dart';
import '../../widgets/glass_card.dart';
import '../../widgets/post_card.dart';
import '../../widgets/loading_skeleton.dart';
import '../../widgets/search_overlay.dart';
import '../../core/models/post.dart';

class FeedScreen extends StatefulWidget {
  const FeedScreen({super.key});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  final List<Post> _posts = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadFeed();
  }

  Future<void> _loadFeed() async {
    await Future.delayed(const Duration(milliseconds: 600));
    setState(() {
      _posts.addAll(_mockPosts());
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: isDark
                ? [const Color(0xFF0D0D1A), const Color(0xFF08080F)]
                : [const Color(0xFFF5F3FF), const Color(0xFFF8F6FF)],
          ),
        ),
        child: SafeArea(
          child: CustomScrollView(
            slivers: [
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(8, 16, 20, 8),
                  child: Row(
                    children: [
                      IconButton(
                        icon: const Icon(Icons.menu, color: Color(0xFF7C3AED)),
                        onPressed: () => Scaffold.maybeOf(context)?.openDrawer(),
                      ),
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: const Color(0xFF7C3AED).withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Icon(Icons.code, color: Color(0xFF7C3AED), size: 24),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('DevSactum', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
                            Text('Red social para developers', style: TextStyle(fontSize: 13, color: Colors.grey)),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.search, color: Color(0xFF7C3AED)),
                        onPressed: () => showSearchOverlay(context),
                      ),
                    ],
                  ),
                ),
              ),
              SliverToBoxAdapter(
                child: GlassCard(
                  margin: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: '¿Qué estás codeando?',
                      border: InputBorder.none,
                      enabledBorder: InputBorder.none,
                      focusedBorder: InputBorder.none,
                      filled: false,
                    ),
                  ),
                ),
              ),
              if (_loading)
                const SliverFillRemaining(child: LoadingSkeleton())
              else
                SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, i) => PostCard(post: _posts[i]),
                    childCount: _posts.length,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  List<Post> _mockPosts() => [
    Post(id: '1', authorName: 'Ana García', authorHandle: 'anagarcia', text: 'Acabo de terminar mi primer proyecto en Flutter 🎉', tags: ['flutter', 'dart'], likes: 24, comments: 5),
    Post(id: '2', authorName: 'Carlos López', authorHandle: 'carlosdev', text: 'Tip: usa Riverpod en lugar de setState para estado global', code: "final counterProvider = StateNotifierProvider<Counter, int>((ref) => Counter());", tags: ['flutter', 'riverpod'], likes: 42, comments: 8),
    Post(id: '3', authorName: 'María Torres', authorHandle: 'mtorres', text: 'Buscando equipo para hackathon de AI + Mobile. ¿Alguien se apunta?', tags: ['ai', 'mobile', 'hackathon'], likes: 15, comments: 12),
    Post(id: '4', authorName: 'Pedro Ramírez', authorHandle: 'pramirez', text: 'Mi setup de desarrollo: Neovim + Tmux + 3 monitores. ¿Cuál es el suyo?', tags: ['setup', 'devtools'], likes: 38, comments: 21),
    Post(id: '5', authorName: 'Laura Soto', authorHandle: 'laurasoto', text: 'Thread: Cómo migrar de JavaScript a TypeScript sin morir en el intento 🧵', tags: ['typescript', 'javascript', 'migration'], likes: 67, comments: 14),
  ];
}
