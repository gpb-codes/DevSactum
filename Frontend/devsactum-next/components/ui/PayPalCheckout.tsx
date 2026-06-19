"use client"

import React, { useState, useEffect, useRef } from "react"
import { CreditCard, Check, Loader2, Shield, AlertCircle, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/Toast"
import { paypalService, PLANS, type PayPalPlan } from "@/services/payments"

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb"

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => { render: (selector: string) => void }
    }
  }
}

interface PayPalCheckoutProps {
  plan: PayPalPlan
  onSuccess?: (orderId: string) => void
  onError?: (error: string) => void
}

export function PayPalCheckout({ plan, onSuccess, onError }: PayPalCheckoutProps) {
  const { success, error } = useToast()
  const [loading, setLoading] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const [containerId] = useState(() => `paypal-btn-${Math.random().toString(36).slice(2, 9)}`)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.paypal) {
      setSdkReady(true)
      return
    }
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${plan.currency}`
    script.async = true
    script.onload = () => setSdkReady(true)
    script.onerror = () => error("Error", "No se pudo cargar PayPal SDK")
    document.head.appendChild(script)
  }, [plan.currency])

  useEffect(() => {
    if (!sdkReady || !window.paypal) return
    const container = document.getElementById(containerId)
    if (!container) return

    const buttons = window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "pay",
        height: 45,
      },
      createOrder: async () => {
        setLoading(true)
        try {
          const res = await paypalService.createOrder({
            planId: plan.id,
            amount: plan.price,
            currency: plan.currency,
            description: `Devsanctum ${plan.name} - ${plan.interval === "month" ? "Mensual" : "Anual"}`,
          })
          return res.orderId
        } catch (err) {
          setLoading(false)
          onError?.("Error al crear la orden")
          throw err
        }
      },
      onApprove: async (data: Record<string, string>) => {
        try {
          await paypalService.captureOrder(data.orderID!, data.payerID!)
          success("Pago exitoso", `${plan.name} activado correctamente`)
          onSuccess?.(data.orderID!)
        } catch (err) {
          error("Error", "No se pudo confirmar el pago")
          onError?.("Error al capturar el pago")
        } finally {
          setLoading(false)
        }
      },
      onError: (err: unknown) => {
        setLoading(false)
        error("Error de PayPal", "Inténtalo de nuevo")
        onError?.("Error de PayPal")
      },
      onCancel: () => {
        setLoading(false)
      },
    })

    buttons.render(`#${containerId}`)

    return () => {
      container.innerHTML = ""
    }
  }, [sdkReady, plan, success, error, onSuccess, onError, containerId])

  return (
    <div className="bg-bg-surface border border-border rounded-[14px] p-5">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard size={16} className="text-accent" strokeWidth={2} />
        <span className="text-[13px] font-extrabold text-text-h">Pagar con PayPal</span>
      </div>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-[32px] font-black text-text-h">${plan.price}</span>
        <span className="text-[12px] text-text opacity-60">/{plan.interval === "month" ? "mes" : "año"}</span>
      </div>

      <div id={containerId} className="mb-4" />

      {loading && (
        <div className="flex items-center justify-center gap-2 py-3">
          <Loader2 size={16} className="text-accent animate-spin" strokeWidth={2} />
          <span className="text-[12px] text-text">Procesando pago...</span>
        </div>
      )}

      <div className="flex items-center gap-2 text-[10px] text-text opacity-50">
        <Shield size={11} strokeWidth={2} />
        Pago seguro encriptado. Cancela en cualquier momento.
      </div>
    </div>
  )
}

interface PlanCardProps {
  plan: PayPalPlan
  selected: boolean
  onSelect: () => void
}

export function PlanCard({ plan, selected, onSelect }: PlanCardProps) {
  const isYearly = plan.interval === "year"
  const monthlyPrice = isYearly ? Math.round(plan.price / 12) : plan.price
  const savings = isYearly ? `${Math.round((1 - plan.price / (monthlyPrice * 12)) * 100)}%` : null

  return (
    <button
      onClick={onSelect}
      className={`text-left bg-bg-surface border rounded-[14px] p-5 transition-all duration-200 cursor-pointer w-full ${
        selected ? "border-accent shadow-glow" : "border-border hover:border-accent-border"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[14px] font-extrabold text-text-h">{plan.name}</span>
        {selected && <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center"><Check size={12} className="text-[#1a0033]" strokeWidth={3} /></div>}
      </div>

      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-[28px] font-black text-text-h">${monthlyPrice}</span>
        <span className="text-[11px] text-text opacity-60">/mes</span>
        {savings && (
          <span className="ml-2 text-[9px] font-bold text-success bg-success-soft px-2 py-0.5 rounded-full">
            Ahorra {savings}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        {plan.features.map(f => (
          <div key={f} className="flex items-center gap-2 text-[11px] text-text">
            <Check size={10} className="text-success shrink-0" strokeWidth={2.5} />
            {f}
          </div>
        ))}
      </div>
    </button>
  )
}

interface OrderHistoryProps {
  orders: { id: string; planName: string; amount: number; status: string; createdAt: string }[]
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    completed: { label: "Completado", color: "text-success", bg: "bg-success-soft" },
    pending: { label: "Pendiente", color: "text-warning", bg: "bg-warning-soft" },
    failed: { label: "Fallido", color: "text-danger", bg: "bg-danger-soft" },
    refunded: { label: "Reembolsado", color: "text-text", bg: "bg-bg-hover" },
  }

  return (
    <div className="bg-bg-surface border border-border rounded-[14px] overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-[13px] font-extrabold text-text-h m-0">Historial de pagos</h3>
      </div>
      {orders.length === 0 ? (
        <div className="p-8 text-center">
          <CreditCard size={32} className="mx-auto text-text opacity-20 mb-3" strokeWidth={1.5} />
          <p className="text-[12px] text-text opacity-60 m-0">No hay pagos registrados</p>
        </div>
      ) : (
        <div>
          {orders.map(order => {
            const s = statusConfig[order.status] || statusConfig.pending
            return (
              <div key={order.id} className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-none">
                <div className="w-9 h-9 rounded-[8px] bg-accent-bg border border-accent-border flex items-center justify-center">
                  <CreditCard size={14} className="text-accent" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] font-bold text-text-h block">{order.planName}</span>
                  <span className="text-[10px] text-text opacity-50">{new Date(order.createdAt).toLocaleDateString("es-ES")}</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${s.color} ${s.bg}`}>{s.label}</span>
                <span className="text-[13px] font-black text-text-h">${order.amount}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
