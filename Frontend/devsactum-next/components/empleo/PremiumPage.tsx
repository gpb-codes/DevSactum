"use client"

import React, { useState } from "react"
import {
  Star, Brain, BarChart3, Filter, ShieldCheck, MessageSquare,
  LayoutGrid, Infinity, TrendingUp, Plug, Headphones, Code2,
  Check, ArrowRight, Zap, Crown, Sparkles, Lock, Eye,
} from "lucide-react"
import { useNav } from "@/context/NavContext"
import { useToast } from "@/components/ui/Toast"
import { useJobAuth } from "@/context/JobAuthContext"
import { PREMIUM_FEATURES } from "@/lib/mock-jobs"
import { PayPalCheckout, PlanCard, OrderHistory } from "@/components/ui/PayPalCheckout"
import { PLANS } from "@/services/payments"
import type { PayPalPlan } from "@/services/payments"
import type { PremiumFeature } from "@/types"

const ICON_MAP: Record<string, React.ElementType> = {
  star: Star, brain: Brain, chart: BarChart3, filter: Filter,
  shield: ShieldCheck, message: MessageSquare, kanban: LayoutGrid,
  infinity: Infinity, dollar: TrendingUp, plug: Plug,
  headset: Headphones, code: Code2,
}

const CATEGORY_COLORS: Record<PremiumFeature["category"], { label: string; color: string; bg: string }> = {
  visibility: { label: "Visibilidad", color: "text-accent", bg: "bg-accent-bg" },
  analytics:  { label: "Analytics",  color: "text-secondary", bg: "bg-secondary-soft" },
  tools:      { label: "Herramientas", color: "text-primary", bg: "bg-primary-soft" },
  support:    { label: "Soporte",    color: "text-success", bg: "bg-success-soft" },
}

function FeatureCard({ feature, idx }: { feature: PremiumFeature; idx: number }) {
  const Icon = ICON_MAP[feature.icon] || Star
  const cat = CATEGORY_COLORS[feature.category]

  return (
    <div className="bg-bg-surface border border-border rounded-[14px] p-5 hover:border-accent-border transition-all duration-200 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
      <div className="flex items-start gap-3.5 mb-3">
        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${cat.bg}`}>
          <Icon size={18} className={cat.color} strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[13px] font-extrabold text-text-h m-0">{feature.name}</h3>
            {feature.popular && (
              <span className="text-[8px] font-extrabold uppercase tracking-[1px] text-accent bg-accent-bg border border-accent-border px-1.5 py-0.5 rounded-full">
                Popular
              </span>
            )}
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-[1.5px] ${cat.color} opacity-70`}>{cat.label}</span>
        </div>
      </div>
      <p className="text-[12px] text-text leading-[1.6] m-0 opacity-80">{feature.description}</p>
    </div>
  )
}

export default function PremiumPage() {
  const { setActivePage } = useNav()
  const { success } = useToast()
  const { user, upgradeToPremium } = useJobAuth()
  const [selectedPlan, setSelectedPlan] = useState<PayPalPlan | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [orders] = useState<{ id: string; planName: string; amount: number; status: string; createdAt: string }[]>([])

  function handleSelectPlan(plan: PayPalPlan) {
    setSelectedPlan(plan)
    setShowCheckout(true)
  }

  function handlePaymentSuccess(orderId: string) {
    upgradeToPremium()
    setShowCheckout(false)
    setSelectedPlan(null)
    success("Premium activado", `Orden ${orderId} completada`)
  }

  return (
    <div className="px-6 py-6 max-w-[900px] mx-auto">
      {/* Hero */}
      <section className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Crown size={16} className="text-accent" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Premium</span>
        </div>
        <h1 className="text-[42px] font-black tracking-[-2px] text-text-h leading-[1.05] mb-3">
          Potencia tu<br />
          <span className="gradient-text italic">reclutamiento.</span>
        </h1>
        <p className="text-[14px] text-text leading-[1.7] max-w-[460px] mx-auto opacity-80">
          12 herramientas premium diseñadas para que las mejores empresas encuentren a los mejores developers.
        </p>
      </section>

      {/* Privacy warning banner */}
      {!user?.isPremium && (
        <div className="bg-bg-surface border border-danger rounded-[14px] p-5 mb-8 flex items-start gap-4 animate-fade-in">
          <div className="w-10 h-10 rounded-[10px] bg-danger-soft border border-[rgba(248,113,113,0.3)] flex items-center justify-center shrink-0">
            <Lock size={18} className="text-danger" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h3 className="text-[14px] font-extrabold text-text-h m-0 mb-1 flex items-center gap-2">
              Tu información personal está oculta
              <Eye size={14} className="text-danger" strokeWidth={2} />
            </h3>
            <p className="text-[12px] text-text leading-[1.6] m-0 opacity-80">
              Sin Premium, tu email, contacto, teléfono y datos personales <strong className="text-danger">no son visibles</strong> para otros usuarios. Solo se muestran tus publicaciones y perfil público. Actualiza para desbloquear tu información de contacto.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("pricing-section")
              el?.scrollIntoView({ behavior: "smooth" })
            }}
            className="shrink-0 bg-accent text-[#1a0033] border-none rounded-[8px] px-4 py-2 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity"
          >
            Ver planes
          </button>
        </div>
      )}

      {user?.isPremium && (
        <div className="bg-bg-surface border border-success rounded-[14px] p-5 mb-8 flex items-center gap-4 animate-fade-in">
          <div className="w-10 h-10 rounded-[10px] bg-success-soft border border-[rgba(74,222,128,0.3)] flex items-center justify-center shrink-0">
            <Star size={18} className="text-success" fill="currentColor" strokeWidth={0} />
          </div>
          <div>
            <h3 className="text-[14px] font-extrabold text-text-h m-0 mb-1">Ya tienes Premium activo</h3>
            <p className="text-[12px] text-text m-0 opacity-70">Tu información personal es visible. Todas las features premium están desbloqueadas.</p>
          </div>
        </div>
      )}

      {/* Features grid */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles size={14} className="text-accent" strokeWidth={2} />
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">12 Features Premium</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {PREMIUM_FEATURES.map((f, idx) => <FeatureCard key={f.id} feature={f} idx={idx} />)}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing-section" className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Zap size={14} className="text-accent" strokeWidth={2} />
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Planes con PayPal</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {PLANS.filter(p => p.id.includes("monthly")).map((plan) => (
            <PlanCard key={plan.id} plan={plan} selected={selectedPlan?.id === plan.id} onSelect={() => handleSelectPlan(plan)} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {PLANS.filter(p => p.id.includes("yearly")).map((plan) => (
            <PlanCard key={plan.id} plan={plan} selected={selectedPlan?.id === plan.id} onSelect={() => handleSelectPlan(plan)} />
          ))}
        </div>
      </section>

      {/* Checkout modal */}
      {showCheckout && selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[440px] animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-black text-text-h m-0">Completar pago</h3>
              <button onClick={() => { setShowCheckout(false); setSelectedPlan(null) }}
                className="text-text hover:text-text-h bg-transparent border-none cursor-pointer text-[20px]">×</button>
            </div>
            <PayPalCheckout
              plan={selectedPlan}
              onSuccess={handlePaymentSuccess}
              onError={() => { setShowCheckout(false) }}
            />
          </div>
        </div>
      )}

      {/* Order History */}
      {orders.length > 0 && (
        <section className="mb-8">
          <OrderHistory orders={orders} />
        </section>
      )}

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="text-[18px] font-black text-text-h m-0 mb-5">Preguntas frecuentes</h2>
        <div className="flex flex-col gap-3">
          {[
            { q: "¿Puedo cambiar de plan después?", a: "Sí, puedes actualizar o reducir tu plan en cualquier momento. Los cambios se aplican al siguiente ciclo de facturación." },
            { q: "¿Hay contrato permanente?", a: "No. Todos los planes son mes a mes sin compromiso. Puedes cancelar cuando quieras." },
            { q: "¿Qué métodos de pago aceptan?", a: "Visa, Mastercard, American Express, y transferencia bancaria para planes Enterprise." },
            { q: "¿Ofrecen descuentos para startups?", a: "Sí, startups con menos de 2 años y funding Seed/Angle reciben 50% de descuento en Pro por 12 meses." },
          ].map((item, i) => (
            <div key={i} className="bg-bg-surface border border-border rounded-[12px] p-4">
              <p className="text-[13px] font-bold text-text-h m-0 mb-1">{item.q}</p>
              <p className="text-[12px] text-text m-0 opacity-70 leading-[1.6]">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
