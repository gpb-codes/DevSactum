type ClassValue = string | number | boolean | null | undefined | ClassValue[] | Record<string, boolean | null | undefined>

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  const classes: string[] = []

  const process = (input: ClassValue) => {
    if (!input && input !== 0) return
    if (Array.isArray(input)) {
      input.forEach(process)
      return
    }
    if (typeof input === "object") {
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key) && input[key]) {
          classes.push(key)
        }
      }
      return
    }
    classes.push(String(input))
  }

  inputs.forEach(process)
  return classes.join(" ")
}

/** Format large numbers: 1200 → "1.2k" */
export function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k"
  return String(n)
}

/** Relative time: date → "hace 2h", "hace 3d", etc. */
export function timeAgo(date: Date | string): string {
  const now  = new Date()
  const past = typeof date === "string" ? new Date(date) : date
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diff < 60)       return "ahora"
  if (diff < 3600)     return `hace ${Math.floor(diff / 60)}m`
  if (diff < 86400)    return `hace ${Math.floor(diff / 3600)}h`
  if (diff < 604800)   return `hace ${Math.floor(diff / 86400)}d`
  if (diff < 2592000)  return `hace ${Math.floor(diff / 604800)}sem`
  return past.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
}

/** Truncate text to maxLength with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + "…"
}

/** Generate initials from a full name: "Alex Volkov" → "AV" */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? "")
    .join("")
}

/** Generate a deterministic avatar color pair from a string */
const AVATAR_PALETTES = [
  { color: "#c49aff", bg: "rgba(196,154,255,0.15)" },
  { color: "#ff94a8", bg: "rgba(255,148,168,0.15)" },
  { color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
  { color: "#4ade80", bg: "rgba(74,222,128,0.12)"  },
  { color: "#f59e0b", bg: "rgba(245,158,11,0.12)"  },
  { color: "#fb923c", bg: "rgba(251,146,60,0.12)"  },
]

export function getAvatarPalette(seed: string) {
  const index = seed
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0) % AVATAR_PALETTES.length
  return AVATAR_PALETTES[index]
}

/** Debounce a function */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

/** Check if a string is a valid URL */
export function isValidUrl(str: string): boolean {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

/** Capitalize first letter */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/** Random ID (not cryptographically secure, for UI keys only) */
export function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}