import { api } from "@/lib/api"

export interface PayPalPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: "month" | "year"
  features: string[]
}

export interface PaymentOrder {
  id: string
  planId: string
  planName: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: "paypal"
  paypalOrderId?: string
  paypalPayerId?: string
  createdAt: string
  expiresAt?: string
}

export interface Subscription {
  id: string
  planId: string
  planName: string
  status: "active" | "cancelled" | "expired" | "past_due"
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAt?: string
  paymentMethod: "paypal"
}

interface PayPalCreateOrderRequest {
  planId: string
  amount: number
  currency: string
  description: string
}

interface PayPalCreateOrderResponse {
  orderId: string
  approvalUrl: string
}

interface PayPalCaptureResponse {
  orderId: string
  payerId: string
  status: string
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""

export const paypalService = {
  getPlans: () => Promise.resolve(PLANS),

  createOrder: (data: PayPalCreateOrderRequest) =>
    api.post<PayPalCreateOrderResponse>("/payments/paypal/create-order", data),

  captureOrder: (orderId: string, payerId: string) =>
    api.post<PayPalCaptureResponse>("/payments/paypal/capture", { orderId, payerId }),

  getOrders: () =>
    api.get<PaymentOrder[]>("/payments/orders"),

  getSubscription: () =>
    api.get<Subscription>("/payments/subscription"),

  cancelSubscription: () =>
    api.post<void>("/payments/subscription/cancel"),

  webhook: (event: unknown) =>
    api.post<void>("/payments/paypal/webhook", event),
}

export const PLANS: PayPalPlan[] = [
  {
    id: "pro-monthly",
    name: "Pro",
    price: 49,
    currency: "USD",
    interval: "month",
    features: [
      "10 empleos activos",
      "Match IA con candidatos",
      "Analytics profundos",
      "Badge empresa verificada",
      "Messaging directo",
      "Dashboard Kanban",
    ],
  },
  {
    id: "pro-yearly",
    name: "Pro Anual",
    price: 470,
    currency: "USD",
    interval: "year",
    features: [
      "Todo lo de Pro",
      "2 meses gratis",
      "Soporte prioritario",
      "API Access básico",
    ],
  },
  {
    id: "enterprise-monthly",
    name: "Enterprise",
    price: 199,
    currency: "USD",
    interval: "month",
    features: [
      "Empleos ilimitados",
      "Todo lo de Pro",
      "API Access completo",
      "Integración ATS",
      "Soporte prioritario 2h",
      "Reporte salarial mercado",
      "Account manager dedicado",
    ],
  },
  {
    id: "enterprise-yearly",
    name: "Enterprise Anual",
    price: 1910,
    currency: "USD",
    interval: "year",
    features: [
      "Todo lo de Enterprise",
      "2 meses gratis",
      "SLA 99.9%",
      "Onboarding dedicado",
    ],
  },
]
