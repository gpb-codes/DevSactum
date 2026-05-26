import type { Notification, Post, Contact, Message, Community, Discussion, Contributor, SavedItem } from "@/src/types"

// ─── Current user ─────────────────────────────────────────────────────────────
export const ME = {
  id: "me",
  name: "Alex Volkov",
  handle: "@alex_volkov",
  initials: "AV",
  avatarColor: "#c49aff",
  avatarBg: "rgba(196,154,255,0.15)",
}

// ─── Notifications ─────────────────────────────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "like",    read: false, createdAt: "Hace 5 min",  postPreview: "Optimizing the hydration loop...", actor: { id:"u1", name:"Sarah Chen",      handle:"@sarah_codes",   initials:"SC", avatarColor:"#c49aff", avatarBg:"rgba(196,154,255,.15)", avatarGradient:"linear-gradient(135deg,#c49aff,#7c6fe0)" } },
  { id: "n2", type: "comment", read: false, createdAt: "Hace 18 min", postPreview: "Why We Migrated Our Edge Runtime...", actor: { id:"u2", name:"Alex Rivet",      handle:"@alex_rivet",   initials:"AR", avatarColor:"#ff94a8", avatarBg:"rgba(255,148,168,.15)", avatarGradient:"linear-gradient(135deg,#ff94a8,#f43f5e)" } },
  { id: "n3", type: "follow",  read: false, createdAt: "Hace 34 min", actor: { id:"u3", name:"Dev Guru",        handle:"@dev_guru",     initials:"DG", avatarColor:"#60a5fa", avatarBg:"rgba(96,165,250,.12)",  avatarGradient:"linear-gradient(135deg,#60a5fa,#2563eb)" } },
  { id: "n4", type: "mention", read: false, createdAt: "Hace 1h",    postPreview: "Análisis profundo de la gestión...", actor: { id:"u4", name:"oxide_dev",       handle:"@oxide_dev",    initials:"OD", avatarColor:"#4ade80", avatarBg:"rgba(74,222,128,.12)",  avatarGradient:"linear-gradient(135deg,#4ade80,#16a34a)" } },
  { id: "n5", type: "share",   read: true,  createdAt: "Hace 3h",    postPreview: "The Future of Decentralized...", actor: { id:"u5", name:"frontend_queen",  handle:"@frontend_queen",initials:"FQ", avatarColor:"#f59e0b", avatarBg:"rgba(245,158,11,.12)",  avatarGradient:"linear-gradient(135deg,#f59e0b,#d97706)" } },
  { id: "n6", type: "like",    read: true,  createdAt: "Hace 5h",    postPreview: "Layer 7 smart proxy with eBPF...", actor: { id:"u6", name:"Soren K.",        handle:"@soren_kernel",  initials:"SK", avatarColor:"#c49aff", avatarBg:"rgba(196,154,255,.15)", avatarGradient:"linear-gradient(135deg,#c49aff,#7c6fe0)" } },
  { id: "n7", type: "comment", read: true,  createdAt: "Ayer",       postPreview: "Core engine for vector similarity...", actor: { id:"u7", name:"María R.",        handle:"@maria_oss",    initials:"MR", avatarColor:"#ff94a8", avatarBg:"rgba(255,148,168,.15)", avatarGradient:"linear-gradient(135deg,#ff94a8,#f43f5e)" } },
]

// ─── Feed posts ────────────────────────────────────────────────────────────────
export const MOCK_POSTS: Post[] = [
  {
    id: 1, time: "2h", liked: false, likes: 1200, comments: 84, shares: 12,
    author: { id:"u1", name:"James Dalton", handle:"@jdalton_dev", initials:"JD", avatarColor:"#c49aff", avatarBg:"rgba(196,154,255,.15)" },
    text: "Optimizando el loop de hidratación para el nuevo reactive engine. Reducimos TTI un 40% usando un custom worker-thread scheduler. Miren la implementación core:",
    code: `async function hydrate(root: Node) {\n  // Offload expensive diffing to Worker\n  const patch = await worker.computeDiff(root);\n\n  requestIdleCallback(() => {\n    applyPatch(root, patch);\n  });\n}`,
    codeFile: "scheduler.ts",
  },
  {
    id: 2, time: "5h", liked: true, likes: 452, comments: 29, shares: 8,
    author: { id:"u2", name:"Elena Rivera", handle:"@elena_codes", initials:"ER", avatarColor:"#ff94a8", avatarBg:"rgba(255,148,168,.15)" },
    text: "Terminé la UI hardware-acelerada para el nuevo emulador de terminal. El tonal layering y los luminescent pulses se sienten mucho mejor que los bordes estándar. 🎨",
    tags: ["Design System", "Rust", "WGPU"],
  },
  {
    id: 3, time: "8h", liked: false, likes: 891, comments: 114, shares: 0,
    author: { id:"u3", name:"Soren K.", handle:"@soren_kernel", initials:"SK", avatarColor:"#60a5fa", avatarBg:"rgba(96,165,250,.12)" },
    text: "",
    milestone: { quote: "Shipped v2.0 of the decentralized storage layer. 0% downtime during migration.", stat: "142k", statLabel: "requests/s", statCaption: "Peak Throughput" },
  },
  {
    id: 4, time: "12h", liked: false, likes: 234, comments: 67, shares: 19,
    author: { id:"u4", name:"María R.", handle:"@maria_oss", initials:"MR", avatarColor:"#4ade80", avatarBg:"rgba(74,222,128,.12)" },
    text: "Finalmente entendí el ownership model de Rust después de 6 meses. El click que te da cuando todo hace sentido es increíble. Si están aprendiendo Rust, el libro de Jon Gjengset es OBLIGATORIO.",
    tags: ["Rust", "Learning"],
  },
  {
    id: 5, time: "1d", liked: false, likes: 1876, comments: 312, shares: 88,
    author: { id:"u5", name:"Tom Simons", handle:"@tsimons_dev", initials:"TS", avatarColor:"#f59e0b", avatarBg:"rgba(245,158,11,.12)" },
    text: "Hot take: La mayoría de microservicios deberían ser monolitos bien estructurados. La complejidad operacional de K8s + service mesh + distributed tracing no vale la pena para el 90% de los productos.",
  },
]

// ─── Chat ─────────────────────────────────────────────────────────────────────
export const MOCK_CONTACTS: Contact[] = [
  { id:"c1", name:"Alex Rivet",  handle:"@alex_rivet",  initials:"AR", avatarColor:"#c49aff", avatarBg:"rgba(196,154,255,.15)", last:"Acabo de hacer push al repo 🚀",     time:"2m",  unread:3, online:true  },
  { id:"c2", name:"Sarah Chen",  handle:"@sarah_codes", initials:"SC", avatarColor:"#ff94a8", avatarBg:"rgba(255,148,168,.15)", last:"¿Revisaste el PR que mandé?",        time:"14m", unread:0, online:true  },
  { id:"c3", name:"María R.",    handle:"@maria_oss",   initials:"MR", avatarColor:"#4ade80", avatarBg:"rgba(74,222,128,.12)",  last:"El diseño nuevo se ve increíble 🎨", time:"1h",  unread:1, online:false },
  { id:"c4", name:"Juan López",  handle:"@jlopez",      initials:"JL", avatarColor:"#60a5fa", avatarBg:"rgba(96,165,250,.12)",  last:"Nos vemos en el standup",            time:"3h",  unread:0, online:false },
  { id:"c5", name:"Dev Team",    handle:"@devteam",     initials:"DV", avatarColor:"#f59e0b", avatarBg:"rgba(245,158,11,.12)",  last:"Carlos: CI pasó ✅",                 time:"5h",  unread:7, online:false },
]

export const MOCK_MESSAGES: Record<string, Message[]> = {
  c1: [
    { id:1, text:"Hey, acabo de hacer push al repo con los cambios del auth 🚀", mine:false, time:"10:32", read:true  },
    { id:2, text:"Genial! Lo reviso ahora",                                       mine:true,  time:"10:33", read:true  },
    { id:3, text:"Hay un bug en el middleware, lo ves?",                          mine:false, time:"10:35", read:true  },
    { id:4, text:"Sí lo veo, lo fixeo en unos minutos",                           mine:true,  time:"10:36", read:false },
  ],
  c2: [
    { id:1, text:"¿Revisaste el PR que mandé ayer?", mine:false, time:"09:15", read:true },
    { id:2, text:"Todavía no, lo hago ahora",         mine:true,  time:"09:20", read:true },
  ],
  c3: [{ id:1, text:"El diseño nuevo se ve increíble 🎨",  mine:false, time:"08:00", read:true }],
  c4: [{ id:1, text:"Nos vemos en el standup a las 10",    mine:false, time:"07:45", read:true }],
  c5: [{ id:1, text:"CI pasó en todos los branches ✅",    mine:false, time:"06:30", read:true }],
}

// ─── Communities ──────────────────────────────────────────────────────────────
export const MOCK_COMMUNITIES: Community[] = [
  { id:1, name:"Web3 Builders",  badge:"Crecimiento más rápido", featured:true,  desc:"Construyendo el futuro descentralizado con Ethereum, Solana y Rust.", members:"12.4k", iconColor:"#c49aff", iconBg:"rgba(196,154,255,.15)" },
  { id:2, name:"Rustaceans",     featured:false, desc:"", members:"8.1k",  online:"242",  iconColor:"#c49aff", iconBg:"rgba(196,154,255,.15)" },
  { id:3, name:"Next.js Experts",featured:false, desc:"", members:"15.2k", online:"1.1k", iconColor:"#ff94a8", iconBg:"rgba(255,148,168,.15)" },
]

export const MOCK_DISCUSSIONS: Discussion[] = [
  { id:1, community:"Rustaceans",    communityColor:"text-accent",   author:"@oxide_dev",     time:"hace 4h", title:"Análisis profundo de la gestión de memoria en v1.75",         text:"La última versión trae mejoras significativas en cómo manejamos las asignaciones de memoria concurrentes.", comments:128, shares:42  },
  { id:2, community:"Next.js Experts",communityColor:"text-tertiary",author:"@frontend_queen",time:"hace 8h", title:"¿Son las Server Actions el clavo final para las librerías API?", text:"Con la estabilización de las Server Actions, la frontera entre cliente y servidor se difumina más que nunca.",  comments:312, shares:15  },
]

export const MOCK_CONTRIBUTORS: Contributor[] = [
  { id:"co1", name:"Sarah Chen", handle:"@sarah_codes", initials:"SC", avatarColor:"#c49aff", avatarBg:"rgba(196,154,255,.15)", points:"+2.4k", role:"Experta en Rust" },
  { id:"co2", name:"Dev Guru",   handle:"@dev_guru",    initials:"DG", avatarColor:"#ff94a8", avatarBg:"rgba(255,148,168,.15)", points:"+1.8k", role:"Gurú de Web3"   },
  { id:"co3", name:"V Scale",    handle:"@v_scale",     initials:"VS", avatarColor:"#60a5fa", avatarBg:"rgba(96,165,250,.12)",  points:"+1.1k", role:"Arquitecto"     },
]

// ─── Saved items ──────────────────────────────────────────────────────────────
export const MOCK_SAVED: SavedItem[] = [
  { id:1, type:"post",      savedAt:"Hace 2h",  tags:["Performance","React","Workers"], title:"Optimizando el hydration loop para el nuevo reactive engine",      preview:"Reducimos TTI un 40% usando un custom worker-thread scheduler.", author:{ id:"u1", name:"James Dalton",  handle:"@jdalton_dev", initials:"JD", avatarColor:"#c49aff", avatarBg:"rgba(196,154,255,.15)" } },
  { id:2, type:"article",   savedAt:"Hace 5h",  tags:["Web3","Infrastructure"],        title:"El futuro de la infraestructura descentralizada",                   preview:"Un análisis profundo de cómo los sistemas distribuidos modernos están reemplazando los monolitos.", author:{ id:"u3", name:"Soren K.",      handle:"@soren_kernel",  initials:"SK", avatarColor:"#60a5fa", avatarBg:"rgba(96,165,250,.12)"  } },
  { id:3, type:"repo",      savedAt:"Hace 1d",  tags:["Rust","WebAssembly","Edge"],    title:"lumina-engine",                                                     preview:"High-performance async runtime for WebAssembly modules in edge environments. 12.4k ⭐",    author:{ id:"me", name:"Alex Volkov",   handle:"@alex_volkov",   initials:"AV", avatarColor:"#c49aff", avatarBg:"rgba(196,154,255,.15)" } },
  { id:4, type:"community", savedAt:"Hace 3d",  tags:["Rust","Systems"],               title:"Rustaceans",                                                        preview:"La comunidad más grande de programadores Rust. 8.1k miembros.",                             author:{ id:"co1", name:"Sarah Chen",   handle:"@sarah_codes",   initials:"SC", avatarColor:"#c49aff", avatarBg:"rgba(196,154,255,.15)" } },
]
