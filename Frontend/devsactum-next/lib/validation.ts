export interface ValidationError {
  field: string
  message: string
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "El email es requerido"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email inválido"
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) return "La contraseña es requerida"
  if (password.length < 8) return "Mínimo 8 caracteres"
  return null
}

export function validateName(name: string): string | null {
  if (!name.trim()) return "El nombre es requerido"
  if (name.trim().length < 2) return "Mínimo 2 caracteres"
  return null
}

export function validateRequired(value: string, label: string): string | null {
  if (!value.trim()) return `${label} es requerido`
  return null
}

export function validateForm(fields: { value: string; label: string; validator?: (v: string) => string | null }[]): ValidationError[] {
  const errors: ValidationError[] = []
  for (const field of fields) {
    const error = field.validator ? field.validator(field.value) : validateRequired(field.value, field.label)
    if (error) errors.push({ field: field.label, message: error })
  }
  return errors
}

export function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score, label: "Débil", color: "bg-danger" }
  if (score <= 3) return { score, label: "Media", color: "bg-warning" }
  return { score, label: "Fuerte", color: "bg-success" }
}
