import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class GlassCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? margin;
  final EdgeInsetsGeometry? padding;
  final double borderRadius;
  final VoidCallback? onTap;

  const GlassCard({
    super.key,
    required this.child,
    this.margin,
    this.padding,
    this.borderRadius = 16,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0x1AFFFFFF) : const Color(0xB3FFFFFF);
    final borderColor = isDark ? const Color(0x2FFFFFFF) : const Color(0x2F000000);

    final inner = Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(borderRadius),
        child: Padding(
          padding: padding ?? const EdgeInsets.all(16),
          child: child,
        ),
      ),
    );

    return Container(
      margin: margin ?? const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(borderRadius),
        border: Border.all(color: borderColor, width: 0.5),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(borderRadius),
        child: kIsWeb
            ? inner
            : BackdropFilter(
                filter: ColorFilter.mode(
                  isDark ? Colors.black.withValues(alpha: 0.2) : Colors.white.withValues(alpha: 0.3),
                  BlendMode.srcOver,
                ),
                child: inner,
              ),
      ),
    );
  }
}

class GlassInput extends StatelessWidget {
  final TextEditingController? controller;
  final String? hintText;
  final IconData? prefixIcon;
  final bool obscureText;
  final String? Function(String?)? validator;

  const GlassInput({
    super.key,
    this.controller,
    this.hintText,
    this.prefixIcon,
    this.obscureText = false,
    this.validator,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      obscureText: obscureText,
      validator: validator,
      style: const TextStyle(fontSize: 15),
      decoration: InputDecoration(
        hintText: hintText,
        prefixIcon: prefixIcon != null ? Icon(prefixIcon, size: 20) : null,
      ),
    );
  }
}
