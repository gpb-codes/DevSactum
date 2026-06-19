import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AVATAR_PALETTES } from "@/src/constants"

/** Merge Tailwind classes without conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** 1200 → "1.2k" | 1_500_000 → "1.5M" */
export function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k"
  return String(n)
}

/** Relative timestamp in Spanish */
export function timeAgo(date: Date | string): string {
  const now  = new Date()
  const past = typeof date === "string" ? new Date(date) : date
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000)
  if (diff < 60)     return "ahora"
  if (diff < 3600)   return `hace ${Math.floor(diff / 60)}m`
  if (diff < 86400)  return `hace ${Math.floor(diff / 3600)}h`
  if (diff < 604800) return `hace ${Math.floor(diff / 86400)}d`
  return past.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
}

/** Truncate with ellipsis */
export function truncate(text: string, max: number): string {
  return text.length <= max ? text : text.slice(0, max).trimEnd() + "…"
}

/** "Alex Volkov" → "AV" */
export function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("")
}

/** Deterministic avatar palette from any string seed */
export function getAvatarPalette(seed: string) {
  const i = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_PALETTES.length
  return AVATAR_PALETTES[i]
}

/** Debounce */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms) }
}

/** Random short ID (UI keys only, not crypto) */
export function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

/** Clamp number between min and max */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max)
}
