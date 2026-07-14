class Validators {
  static String? email(String? value) {
    if (value == null || value.isEmpty) return 'El email es requerido';
    final regex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!regex.hasMatch(value)) return 'Email inválido';
    return null;
  }

  static String? password(String? value) {
    if (value == null || value.isEmpty) return 'La contraseña es requerida';
    if (value.length < 6) return 'Mínimo 6 caracteres';
    return null;
  }

  static String? required(String? value, [String field = 'Este campo']) {
    if (value == null || value.isEmpty) return '$field es requerido';
    return null;
  }
}
