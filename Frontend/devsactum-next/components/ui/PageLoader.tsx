"use client"

export function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20 animate-fade-in">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-soft border border-primary-border flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
        <span className="text-[11px] font-bold text-text-muted tracking-wide uppercase">Cargando...</span>
      </div>
    </div>
  )
}
