"use client"

import React, { useState } from "react"
import {
  User, Lock, Bell, Palette, Globe, Shield,
  Eye, EyeOff, Moon, Sun, Monitor, Check,
  Link2, Trash2, LogOut,
} from "lucide-react"

/* Íconos de marca — lucide-react v1+ los eliminó, usamos SVG inline */
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

/* ── Types ── */
type Section = "perfil" | "cuenta" | "privacidad" | "notificaciones" | "apariencia" | "integraciones"

/* ── Toggle ── */
function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-[22px] rounded-full border transition-colors duration-200 cursor-pointer shrink-0 ${
        enabled ? "bg-accent border-accent" : "bg-bg-hover border-border"
      }`}
    >
      <div
        className={`absolute top-[3px] w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
          enabled ? "translate-x-[18px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  )
}

/* ── Section nav ── */
const SECTIONS: { id: Section; label: string; Icon: React.ElementType }[] = [
  { id: "perfil",         label: "Perfil",         Icon: User    },
  { id: "cuenta",         label: "Cuenta",         Icon: Lock    },
  { id: "privacidad",     label: "Privacidad",     Icon: Shield  },
  { id: "notificaciones", label: "Notificaciones", Icon: Bell    },
  { id: "apariencia",     label: "Apariencia",     Icon: Palette },
  { id: "integraciones",  label: "Integraciones",  Icon: Link2   },
]

/* ── Main ── */
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("perfil")

  /* Perfil */
  const [profile, setProfile] = useState({
    name: "Alex Volkov",
    handle: "@alex_volkov",
    bio: "Building resilient infrastructure at global scale. Contributor to open-source kernel modules.",
    website: "https://alexvolkov.dev",
    location: "San Francisco, CA",
  })

  /* Cuenta */
  const [email, setEmail] = useState("alex@sanctum.sh")
  const [showPass, setShowPass] = useState(false)
  const [newPass, setNewPass] = useState("")

  /* Privacidad */
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showActivity: true,
    allowMentions: true,
    showFollowers: true,
    indexable: false,
  })

  /* Notificaciones */
  const [notifs, setNotifs] = useState({
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    directMessages: true,
    newsletters: false,
    weeklyDigest: true,
    pushEnabled: false,
  })

  /* Apariencia */
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark")
  const [accentColor, setAccentColor] = useState("#c49aff")
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md")
  const [reducedMotion, setReducedMotion] = useState(false)

  /* Save feedback */
  const [saved, setSaved] = useState(false)
  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  /* Helper: toggle row */
  function ToggleRow({
    label, description, stateKey, state, setState,
  }: {
    label: string; description: string; stateKey: string
    state: Record<string, boolean>
    setState: React.Dispatch<React.SetStateAction<any>>
  }) {
    return (
      <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
        <div>
          <div className="text-[13px] font-semibold text-text-h">{label}</div>
          <div className="text-[11px] text-text mt-0.5 opacity-70">{description}</div>
        </div>
        <Toggle
          enabled={state[stateKey]}
          onChange={() => setState((p: any) => ({ ...p, [stateKey]: !p[stateKey] }))}
        />
      </div>
    )
  }

  /* Shared input class */
  const input = "w-full h-[40px] px-3.5 bg-bg border border-border rounded-[8px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors"
  const label = "block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2"

  return (
    <div className="px-6 py-6 max-w-[960px] mx-auto">

      {/* Header */}
      <div className="mb-7">
        <h1 className="text-[26px] font-black tracking-[-1px] text-text-h m-0">Configuración</h1>
        <p className="text-[13px] text-text mt-1 m-0">Administra tu cuenta, privacidad y preferencias.</p>
      </div>

      <div className="flex gap-6 items-start">

        {/* ── Sidebar ── */}
        <aside className="w-[200px] shrink-0 sticky top-20">
          <nav className="flex flex-col gap-0.5">
            {SECTIONS.map(({ id, label: lbl, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] font-semibold text-left border transition-all duration-150 cursor-pointer w-full ${
                  activeSection === id
                    ? "bg-accent-bg text-accent border-accent-border"
                    : "text-text border-transparent hover:bg-bg-hover hover:text-text-h"
                }`}
              >
                <Icon size={15} strokeWidth={1.8} className="shrink-0 opacity-75" />
                {lbl}
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-border flex flex-col gap-1">
            <button className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] font-semibold text-text border border-transparent hover:bg-bg-hover hover:text-text-h transition-all duration-150 cursor-pointer w-full">
              <LogOut size={15} strokeWidth={1.8} className="shrink-0 opacity-75" />
              Cerrar sesión
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] font-semibold text-red-400 border border-transparent hover:bg-red-500/10 transition-all duration-150 cursor-pointer w-full">
              <Trash2 size={15} strokeWidth={1.8} className="shrink-0" />
              Eliminar cuenta
            </button>
          </div>
        </aside>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">
          <div className="bg-bg-surface border border-border rounded-[14px] overflow-hidden">

            {/* PERFIL */}
            {activeSection === "perfil" && (
              <div className="p-6">
                <h2 className="text-[15px] font-extrabold text-text-h mb-5 m-0">Información del perfil</h2>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-[72px] h-[72px] rounded-[14px] bg-accent-bg border border-accent-border flex items-center justify-center text-[22px] font-black text-accent shrink-0">
                    AV
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-text-h mb-1">Foto de perfil</div>
                    <div className="text-[11px] text-text opacity-70 mb-2.5">JPG, PNG o GIF. Máximo 4MB.</div>
                    <div className="flex gap-2">
                      <button className="bg-accent text-[#1a0033] border-none rounded-[8px] px-3.5 py-1.5 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity">
                        Cambiar imagen
                      </button>
                      <button className="bg-transparent text-text border border-border rounded-[8px] px-3.5 py-1.5 text-[11px] font-bold cursor-pointer hover:border-accent-border transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={label}>Nombre</label>
                    <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className={input} />
                  </div>
                  <div>
                    <label className={label}>Handle</label>
                    <input value={profile.handle} onChange={e => setProfile(p => ({ ...p, handle: e.target.value }))} className={input} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={label}>Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-[8px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors resize-none leading-[1.6]"
                  />
                  <div className="text-[10px] text-text opacity-50 mt-1 text-right">{profile.bio.length}/160</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={label}>Sitio web</label>
                    <input value={profile.website} onChange={e => setProfile(p => ({ ...p, website: e.target.value }))} className={input} />
                  </div>
                  <div>
                    <label className={label}>Ubicación</label>
                    <input value={profile.location} onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} className={input} />
                  </div>
                </div>
              </div>
            )}

            {/* CUENTA */}
            {activeSection === "cuenta" && (
              <div className="p-6">
                <h2 className="text-[15px] font-extrabold text-text-h mb-5 m-0">Cuenta y seguridad</h2>

                <div className="mb-5 pb-5 border-b border-border">
                  <label className={label}>Correo electrónico</label>
                  <div className="flex gap-2">
                    <input value={email} onChange={e => setEmail(e.target.value)} className={`${input} flex-1 w-auto`} />
                    <button className="bg-accent text-[#1a0033] border-none rounded-[8px] px-4 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity shrink-0">
                      Verificar
                    </button>
                  </div>
                </div>

                <div className="mb-5 pb-5 border-b border-border">
                  <div className="text-[13px] font-semibold text-text-h mb-4">Cambiar contraseña</div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className={label}>Contraseña actual</label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          placeholder="••••••••"
                          className={`${input} pr-10`}
                        />
                        <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-text">
                          {showPass ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className={label}>Nueva contraseña</label>
                      <input type="password" placeholder="••••••••" value={newPass} onChange={e => setNewPass(e.target.value)} className={input} />
                      {newPass.length > 0 && (
                        <div className="mt-2 flex gap-1">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
                              newPass.length >= i * 3
                                ? i <= 1 ? "bg-red-500" : i <= 2 ? "bg-yellow-500" : i <= 3 ? "bg-blue-400" : "bg-green-400"
                                : "bg-bg-hover"
                            }`} />
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="self-start bg-accent text-[#1a0033] border-none rounded-[8px] px-4 py-2 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity">
                      Actualizar contraseña
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-semibold text-text-h">Autenticación en 2 pasos</div>
                    <div className="text-[11px] text-text opacity-70 mt-0.5">Protege tu cuenta con una app de autenticación.</div>
                  </div>
                  <button className="bg-transparent text-accent border border-accent-border rounded-[8px] px-4 py-1.5 text-[11px] font-bold cursor-pointer hover:bg-accent-bg transition-colors">
                    Activar
                  </button>
                </div>
              </div>
            )}

            {/* PRIVACIDAD */}
            {activeSection === "privacidad" && (
              <div className="p-6">
                <h2 className="text-[15px] font-extrabold text-text-h mb-1 m-0">Privacidad</h2>
                <p className="text-[12px] text-text opacity-70 mb-5">Controla quién puede ver tu información y actividad.</p>
                <ToggleRow label="Perfil público"        description="Cualquier persona puede ver tu perfil."                  stateKey="publicProfile"  state={privacy} setState={setPrivacy} />
                <ToggleRow label="Mostrar actividad"     description="Tu actividad reciente aparece en tu perfil."             stateKey="showActivity"   state={privacy} setState={setPrivacy} />
                <ToggleRow label="Permitir menciones"    description="Otros usuarios pueden mencionarte en sus posts."         stateKey="allowMentions"  state={privacy} setState={setPrivacy} />
                <ToggleRow label="Mostrar seguidores"    description="La lista de seguidores es visible públicamente."         stateKey="showFollowers"  state={privacy} setState={setPrivacy} />
                <ToggleRow label="Indexable en buscadores" description="Tu perfil puede aparecer en Google y otros motores."  stateKey="indexable"      state={privacy} setState={setPrivacy} />
              </div>
            )}

            {/* NOTIFICACIONES */}
            {activeSection === "notificaciones" && (
              <div className="p-6">
                <h2 className="text-[15px] font-extrabold text-text-h mb-5 m-0">Notificaciones</h2>

                <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text opacity-50 mb-1">En la app</div>
                <ToggleRow label="Likes"             description="Cuando alguien da like a tu contenido."    stateKey="likes"           state={notifs} setState={setNotifs} />
                <ToggleRow label="Comentarios"       description="Cuando alguien comenta tus posts."         stateKey="comments"        state={notifs} setState={setNotifs} />
                <ToggleRow label="Nuevos seguidores" description="Cuando alguien empieza a seguirte."        stateKey="follows"         state={notifs} setState={setNotifs} />
                <ToggleRow label="Menciones"         description="Cuando alguien te menciona."               stateKey="mentions"        state={notifs} setState={setNotifs} />
                <ToggleRow label="Mensajes directos" description="Nuevos mensajes en tu chat."               stateKey="directMessages"  state={notifs} setState={setNotifs} />

                <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text opacity-50 mt-6 mb-1">Por correo</div>
                <ToggleRow label="Newsletters"        description="Actualizaciones y novedades de Devsanctum."        stateKey="newsletters"   state={notifs} setState={setNotifs} />
                <ToggleRow label="Resumen semanal"    description="Un digest con lo más destacado de la semana."      stateKey="weeklyDigest"  state={notifs} setState={setNotifs} />
                <ToggleRow label="Notificaciones push" description="Recibe notificaciones en tu dispositivo."         stateKey="pushEnabled"   state={notifs} setState={setNotifs} />
              </div>
            )}

            {/* APARIENCIA */}
            {activeSection === "apariencia" && (
              <div className="p-6">
                <h2 className="text-[15px] font-extrabold text-text-h mb-5 m-0">Apariencia</h2>

                {/* Tema */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text opacity-50 mb-3">Tema</div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {([
                      { id: "dark",   label: "Oscuro",  Icon: Moon    },
                      { id: "light",  label: "Claro",   Icon: Sun     },
                      { id: "system", label: "Sistema", Icon: Monitor },
                    ] as const).map(({ id, label: lbl, Icon }) => (
                      <button
                        key={id}
                        onClick={() => setTheme(id)}
                        className={`flex flex-col items-center gap-2 py-4 rounded-[10px] border cursor-pointer transition-all duration-150 ${
                          theme === id
                            ? "bg-accent-bg border-accent text-accent"
                            : "bg-bg border-border text-text hover:border-accent-border"
                        }`}
                      >
                        <Icon size={18} strokeWidth={1.8} />
                        <span className="text-[11px] font-bold">{lbl}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Acento */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text opacity-50 mb-3">Color de acento</div>
                  <div className="flex gap-3 flex-wrap">
                    {["#c49aff", "#60a5fa", "#4ade80", "#fb923c", "#f472b6", "#facc15"].map(color => (
                      <button
                        key={color}
                        onClick={() => setAccentColor(color)}
                        className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-transform duration-150 hover:scale-110 border-2"
                        style={{
                          background: color,
                          borderColor: accentColor === color ? color : "transparent",
                          boxShadow: accentColor === color ? `0 0 0 2px var(--color-bg), 0 0 0 4px ${color}` : "none",
                        }}
                      >
                        {accentColor === color && <Check size={12} className="text-[#1a0033]" strokeWidth={3} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tamaño fuente */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text opacity-50 mb-3">Tamaño de texto</div>
                  <div className="flex gap-2">
                    {([
                      { id: "sm", label: "Pequeño" },
                      { id: "md", label: "Normal"  },
                      { id: "lg", label: "Grande"  },
                    ] as const).map(({ id, label: lbl }) => (
                      <button
                        key={id}
                        onClick={() => setFontSize(id)}
                        className={`flex-1 py-2 rounded-[8px] border text-[12px] font-bold cursor-pointer transition-all duration-150 ${
                          fontSize === id
                            ? "bg-accent-bg text-accent border-accent-border"
                            : "bg-bg text-text border-border hover:border-accent-border"
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reducir movimiento */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-semibold text-text-h">Reducir movimiento</div>
                    <div className="text-[11px] text-text opacity-70 mt-0.5">Minimiza las animaciones de la interfaz.</div>
                  </div>
                  <Toggle enabled={reducedMotion} onChange={() => setReducedMotion(!reducedMotion)} />
                </div>
              </div>
            )}

            {/* INTEGRACIONES */}
            {activeSection === "integraciones" && (
              <div className="p-6">
                <h2 className="text-[15px] font-extrabold text-text-h mb-1 m-0">Integraciones</h2>
                <p className="text-[12px] text-text opacity-70 mb-5">Conecta tus cuentas externas.</p>

                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { Icon: GithubIcon,  label: "GitHub",   desc: "Sincroniza repositorios y actividad.", connected: true,  color: "#e5e7eb" },
                    { Icon: TwitterIcon, label: "Twitter",  desc: "Comparte posts automáticamente.",      connected: false, color: "#1d9bf0" },
                    { Icon: Globe,       label: "RSS Feed", desc: "Publica en tu blog externo.",          connected: false, color: "#f59e0b" },
                  ].map(({ Icon, label: lbl, desc, connected, color }) => (
                    <div key={lbl} className="flex items-center gap-4 bg-bg border border-border rounded-[10px] p-4">
                      <div
                        className="w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0"
                        style={{ background: `${color}18`, color }}
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-text-h">{lbl}</div>
                        <div className="text-[11px] text-text opacity-70 mt-0.5">{desc}</div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {connected && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-online">
                            <div className="w-1.5 h-1.5 rounded-full bg-online" /> Conectado
                          </span>
                        )}
                        <button className={`border rounded-[8px] px-3.5 py-1.5 text-[11px] font-bold cursor-pointer transition-all duration-150 ${
                          connected
                            ? "bg-transparent text-text border-border hover:border-red-500/50 hover:text-red-400"
                            : "bg-accent text-[#1a0033] border-accent hover:opacity-85"
                        }`}>
                          {connected ? "Desconectar" : "Conectar"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* API Key */}
                <div className="p-4 bg-accent-bg border border-accent-border rounded-[10px] flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[12px] font-bold text-accent">API Key personal</div>
                    <div className="text-[11px] text-text opacity-70 mt-0.5 font-mono tracking-wider">sk_live_••••••••••••••••••••••</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="bg-transparent border border-accent-border text-accent rounded-[7px] px-3 py-1.5 text-[11px] font-bold cursor-pointer hover:bg-accent/10 transition-colors">
                      Copiar
                    </button>
                    <button className="bg-transparent border border-accent-border text-accent rounded-[7px] px-3 py-1.5 text-[11px] font-bold cursor-pointer hover:bg-accent/10 transition-colors">
                      Regenerar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save footer */}
            {activeSection !== "integraciones" && (
              <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
                <button className="bg-transparent text-text border border-border rounded-[8px] px-5 py-2 text-[12px] font-bold cursor-pointer hover:border-accent-border transition-colors">
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-1.5 border-none rounded-[8px] px-5 py-2 text-[12px] font-bold cursor-pointer transition-all duration-200 ${
                    saved
                      ? "bg-green-500/20 text-green-400"
                      : "bg-accent text-[#1a0033] hover:opacity-85"
                  }`}
                >
                  {saved ? <><Check size={13} strokeWidth={2.5} /> Guardado</> : "Guardar cambios"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}