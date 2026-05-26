const IconSearch = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

export default function Topbar() {
    return (
        <header className="topbar">
            <div className="topbar-logo">Devsanctum</div>
            <div className="topbar-search">
                <IconSearch />
                <span>Explorar el contenido</span>
            </div>
        </header>
    )
}