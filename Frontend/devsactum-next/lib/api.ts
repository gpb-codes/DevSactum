const API_GO = process.env.NEXT_PUBLIC_API_GO || "http://localhost:8000/api/v1"
const API_NESTJS = process.env.NEXT_PUBLIC_API_NESTJS || "http://localhost:8001/api/v1"

export type ApiBackend = "go" | "nestjs"

interface RequestConfig extends RequestInit {
  params?: Record<string, string>
}

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

function buildUrl(base: string, path: string, params?: Record<string, string>): string {
  const baseClean = base.replace(/\/+$/, "")
  const pathClean = path.replace(/^\/+/, "")
  let url = `${baseClean}/${pathClean}`
  if (params) {
    const search = new URLSearchParams(params).toString()
    if (search) url += `?${search}`
  }
  return url
}

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("ds-token")
}

function getBaseUrl(backend: ApiBackend): string {
  return backend === "go" ? API_GO : API_NESTJS
}

async function request<T>(backend: ApiBackend, path: string, config: RequestConfig = {}): Promise<T> {
  const { params, headers: customHeaders, ...rest } = config
  const token = getToken()
  const base = getBaseUrl(backend)

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(customHeaders as Record<string, string> || {}),
  }

  const url = buildUrl(base, path, params)

  let response: Response
  try {
    response = await fetch(url, { ...rest, headers })
  } catch (err) {
    throw new ApiError("Error de conexión. Verifica que el backend esté corriendo.", 0, err)
  }

  if (!response.ok) {
    let data: unknown
    try {
      data = await response.json()
    } catch {
      data = null
    }
    const msg = (data as { error?: string; message?: string })?.error
      || (data as { error?: string; message?: string })?.message
      || `Error ${response.status}`
    throw new ApiError(msg, response.status, data)
  }

  if (response.status === 204) return undefined as T
  return response.json()
}

function createClient(backend: ApiBackend) {
  return {
    get: <T>(path: string, config?: RequestConfig) =>
      request<T>(backend, path, { ...config, method: "GET" }),

    post: <T>(path: string, body?: unknown, config?: RequestConfig) =>
      request<T>(backend, path, { ...config, method: "POST", body: body ? JSON.stringify(body) : undefined }),

    put: <T>(path: string, body?: unknown, config?: RequestConfig) =>
      request<T>(backend, path, { ...config, method: "PUT", body: body ? JSON.stringify(body) : undefined }),

    patch: <T>(path: string, body?: unknown, config?: RequestConfig) =>
      request<T>(backend, path, { ...config, method: "PATCH", body: body ? JSON.stringify(body) : undefined }),

    delete: <T>(path: string, config?: RequestConfig) =>
      request<T>(backend, path, { ...config, method: "DELETE" }),
  }
}

export const apiGo = createClient("go")
export const apiNestjs = createClient("nestjs")
export const api = apiGo
