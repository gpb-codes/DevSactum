export default function ExplorePage() {
  return (
    <><header className="fixed top-0 w-full z-50 bg-[#0e0e0e]/70 backdrop-blur-xl border-b border-outline-variant/10">
    <div className="flex justify-between items-center px-6 py-4 max-w-full">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant/15">
          <img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgHLISgIHGUZ-rc-RQI36buJUnDMndhPz0xoN2YFgaiT1VLfA9LQ3MoofIK-RnKDspnD-dpRXhXyPXSElnCcTm24MCibr4XOMTbxfiyyjqaWa4F-beCLiu82QG9I-kXPVkDMPFjkZoazMBRFrIVk6vILidoRNAzrGBRs8XK2cgE5FyCs_VRVqyQXSvCDfRKX7wm0b7lrx2bPucYUcpRox-LOWMBg8jS9q-0GLaNXtNDdbTaTXAl64qONU74f6OwbDlFO-t_inChQ" />
        </div>
        <h1 className="text-[#c49aff] font-black italic tracking-tighter text-lg uppercase">Devsanctum</h1>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <nav className="flex gap-6 items-center">
          <a className="text-[#adaaaa] hover:text-[#c49aff] transition-colors font-bold tracking-tight" href="#">Feed</a>
          <a className="text-white hover:text-[#c49aff] transition-colors font-bold tracking-tight" href="#">Explore</a>
          <a className="text-[#adaaaa] hover:text-[#c49aff] transition-colors font-bold tracking-tight" href="#">Alerts</a>
          <a className="text-[#adaaaa] hover:text-[#c49aff] transition-colors font-bold tracking-tight" href="#">Profile</a>
        </nav>
        <div className="h-6 w-[1px] bg-outline-variant/30"></div>
        <button className="text-[#c49aff] active:scale-95 transition-transform">
          <span className="material-symbols-outlined">terminal</span>
        </button>
      </div>
    </div>
  </header><main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-10">
        <h2 className="text-6xl font-black tracking-tighter mb-4 text-white leading-tight">
          Find your <br /><span className="text-primary italic">collective.</span>
        </h2>
        <p className="text-on-surface-variant text-lg max-w-lg leading-relaxed font-medium">
          Connect with developers building the future. Join specialized hubs of expertise, from systems programming to high-end UI engineering.
        </p>
      </section>
      {/* Category Filters */}
      <div className="flex gap-3 overflow-x-auto pb-10 hide-scrollbar">
        <button className="bg-primary text-on-primary px-8 py-2.5 rounded-full font-bold text-sm flex-shrink-0">All Communities</button>
        <button className="bg-surface-container-high text-on-surface-variant hover:text-white px-8 py-2.5 rounded-full font-bold text-sm flex-shrink-0 transition-colors">Rust</button>
        <button className="bg-surface-container-high text-on-surface-variant hover:text-white px-8 py-2.5 rounded-full font-bold text-sm flex-shrink-0 transition-colors">Web3</button>
      </div>
      {/* Trending Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_10px_#ff94a8]"></span>
            <h3 className="text-xs uppercase tracking-[0.2em] font-black text-on-surface-variant">Trending</h3>
          </div>
          <a className="text-primary text-xs font-black uppercase tracking-widest hover:underline" href="#">View All</a>
        </div>
        <div className="space-y-6">
          {/* Featured: Web3 Builders */}
          <div className="relative bg-surface-container-low rounded-2xl overflow-hidden group border border-outline-variant/10 hover:border-primary/30 transition-all duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,154,255,0.1),transparent)] pointer-events-none"></div>
            <div className="p-8 md:p-10">
              <div className="bg-surface-container-highest text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-6">Fastest Growing</div>
              <h4 className="text-5xl font-black mb-4 tracking-tighter">Web3 Builders</h4>
              <p className="text-on-surface-variant text-lg mb-8 max-w-md leading-relaxed font-medium">Engineering the decentralized future with Ethereum, Solana, and Rust-based smart contracts.</p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">groups</span>
                  <span className="text-on-surface font-bold text-base tracking-tight">12.4k Members</span>
                </div>
                <button className="bg-primary text-on-primary px-10 py-3.5 rounded-xl font-black text-sm active:scale-95 transition-transform">Join Collective</button>
              </div>
            </div>
          </div>
          {/* Rustaceans */}
          <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 flex justify-between items-center group cursor-pointer hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              </div>
              <div>
                <h4 className="text-3xl font-black tracking-tight mb-1">Rustaceans</h4>
                <div className="flex items-center gap-2 text-on-surface-variant text-sm font-bold">
                  <span>8.1k members</span>
                  <span className="opacity-30">•</span>
                  <span>242 online</span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_outward</span>
          </div>
          {/* Next.js Experts */}
          <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 flex justify-between items-center group cursor-pointer hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center border border-outline-variant/10">
                <span className="material-symbols-outlined text-[#ff94a8] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </div>
              <div>
                <h4 className="text-3xl font-black tracking-tight mb-1">Next.js Experts</h4>
                <div className="flex items-center gap-2 text-on-surface-variant text-sm font-bold">
                  <span>15.2k members</span>
                  <span className="opacity-30">•</span>
                  <span>1.1k online</span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_outward</span>
          </div>
        </div>
      </section>
      {/* My Groups Section */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#c49aff]"></span>
          <h3 className="text-xs uppercase tracking-[0.2em] font-black text-on-surface-variant">My Groups</h3>
        </div>
        <div className="space-y-4">
          {/* Go Microservices */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5 flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">developer_board</span>
              </div>
              <div>
                <h5 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">Go Microservices</h5>
                <p className="text-on-surface-variant text-[10px] uppercase font-black tracking-widest">Architects</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex -space-x-2">
                <img alt="Member" className="w-7 h-7 rounded-full border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_9Bdu-uVJyxG7vZ7aZSd71793DhpmCtrY8ul8lugxs8HmfogJ_PnQdipr48Tu5SyvCCT4Qkdck04zXuw7NNmFpvJ2wpmjLymIce1R-iUnFKJnykkDrMIeknrhDUbOUllq79iNxRY-EXjbrt2kGMC5DZunSyYP-heP81yZKl2ZfIuGHg_VM89Nha4Lg5RUTCKaCneMdAgFOPFDSQlAaNb4xrBXW-6VA8tvEp5pZbWfqYO0aadtdcStVWvGxa7HH949yKjXeE1vXg" />
                <div className="w-7 h-7 rounded-full bg-surface-container-highest border-2 border-surface-container-low flex items-center justify-center text-[10px] font-bold text-on-surface">+12</div>
              </div>
              <span className="text-on-surface-variant text-xs font-bold">4.2k mems</span>
            </div>
          </div>
          {/* Typescript Pro */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5 flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">layers</span>
              </div>
              <div>
                <h5 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">Typescript Pro</h5>
                <p className="text-on-surface-variant text-[10px] uppercase font-black tracking-widest">Language Hub</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex -space-x-2">
                <img alt="Member" className="w-7 h-7 rounded-full border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2ODiAlNAnQiqKdUufcsZ3w4LQkAaru6L8jUztzX1Yn_vhCtcyofED5XMal5E7yqH6hR8eJF1-xJx6T9BpcIMK5v3eMLNPqXaSeTuDMvG5AZ171EP_B1cZYUv3iXWcfvGUugFtuSyPcw_Rw20xSUBCavf-R5Lz1doE8UNl6O8XAeO6c-VZKKJSGiNTRnQPz-ZMWomNdOz3aCjoXV89JM2o8m3TU2VuFMU1SA56r6CqJJJCiHMLf1EsXd4xzQR7hw9GifRvjkNAkw" />
                <div className="w-7 h-7 rounded-full bg-surface-container-highest border-2 border-surface-container-low flex items-center justify-center text-[10px] font-bold text-on-surface">+55</div>
              </div>
              <span className="text-on-surface-variant text-xs font-bold">21k mems</span>
            </div>
          </div>
          {/* K8s Masters */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5 flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">cloud_done</span>
              </div>
              <div>
                <h5 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">K8s Masters</h5>
                <p className="text-on-surface-variant text-[10px] uppercase font-black tracking-widest">Cloud Native</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex -space-x-2">
                <img alt="Member" className="w-7 h-7 rounded-full border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9-tQeencShuyhCKMbf0gOvM7o_NEPHjAPJ4zrdXyFchoCeyiUinvyfsHYTnAVtNxe2RJCufaWj6pbCMLzpeJ-fMBZdodACt_kPd8H-CImy-nKp_Ko5f7WkX2ql8Dun1l8IyV-chC0G60mHOsb3VG03PV_YxkS10G9SEZMAgrAk_Nn-oyQ3YjuBJqF4AT6PUA-F7m0zUL1EUpmrc-dYAprYg6IBtl_YvcuUJHlKSS636AHevRx744b1SMbdhmA7urr6Aqq_o3-yQ" />
                <div className="w-7 h-7 rounded-full bg-surface-container-highest border-2 border-surface-container-low flex items-center justify-center text-[10px] font-bold text-on-surface">+9</div>
              </div>
              <span className="text-on-surface-variant text-xs font-bold">3.8k mems</span>
            </div>
          </div>
          {/* Create New */}
          <div className="bg-transparent border-2 border-dashed border-outline-variant/20 p-8 rounded-2xl hover:border-primary/50 transition-all cursor-pointer group flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined">add</span>
            </div>
            <span className="text-base font-black tracking-tight text-on-surface-variant group-hover:text-white uppercase tracking-widest text-xs">Create Collective</span>
          </div>
        </div>
      </section>
      {/* Global Discussions Feed */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_10px_#d896ff]"></span>
          <h3 className="text-xs uppercase tracking-[0.2em] font-black text-on-surface-variant">Global Discussions</h3>
        </div>
        <div className="space-y-12">
          {/* Discussion 1 */}
          <article className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-sm font-bold">
              <span className="text-primary">Rustaceans</span>
              <span className="text-on-surface-variant opacity-30">•</span>
              <span className="text-on-surface-variant">Posted by <span className="text-on-surface">@oxide_dev</span></span>
              <span className="text-on-surface-variant opacity-30">•</span>
              <span className="text-on-surface-variant">4h ago</span>
            </div>
            <h4 className="text-4xl font-black tracking-tighter text-white hover:text-primary transition-colors cursor-pointer leading-tight">Deep Dive into Memory Management in v1.75: What you need to know</h4>
            <p className="text-on-surface-variant text-lg leading-relaxed font-medium">The latest release brings significant improvements to how we handle concurrent memory allocations. I've been testing the new allocator on our production workloads and the results are... interesting.</p>
            <div className="flex items-center gap-8 mt-2">
              <div className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                <span className="text-sm font-black">128</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-2xl">share</span>
                <span className="text-sm font-black">42</span>
              </div>
            </div>
          </article>
          {/* Discussion 2 */}
          <article className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-sm font-bold">
              <span className="text-secondary">Next.js Experts</span>
              <span className="text-on-surface-variant opacity-30">•</span>
              <span className="text-on-surface-variant">Posted by <span className="text-on-surface">@frontend_queen</span></span>
              <span className="text-on-surface-variant opacity-30">•</span>
              <span className="text-on-surface-variant">8h ago</span>
            </div>
            <h4 className="text-4xl font-black tracking-tighter text-white hover:text-primary transition-colors cursor-pointer leading-tight">Is Server Actions the final nail in the coffin for client-side API libraries?</h4>
            <p className="text-on-surface-variant text-lg leading-relaxed font-medium">With the stabilization of Server Actions, the boundary between client and server is blurring more than ever. Does anyone still find a need for React Query in small to mid-sized apps?</p>
            <div className="flex items-center gap-8 mt-2">
              <div className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                <span className="text-sm font-black">312</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-2xl">share</span>
                <span className="text-sm font-black">15</span>
              </div>
            </div>
          </article>
        </div>
      </section>
      {/* Top Contributors */}
      <section className="mb-14">
        <h5 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-10">Top Contributors</h5>
        <div className="space-y-8">
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <img alt="User" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDolP7-zq2MH5Ow06WO6UxmZm6S90an_80_Yl1Y9qGJ5ngEZVzcDffWYdwYZynoo2cgE5tODLPfvPCLBvIQ35Rp90iiFqRVeYw_c1kfsVOe1U_gtGb7wWwCFn-9KeyFnqMmvvUEBsmkLjJ3Xm90LiDHY823Ip7qDNWKPVcngYyj0ONqp-qyPgsIKSLNsxYcn-EtMEEYzlmIUXN_yHZiPyDxyvicpAEAnP4b1z7__RJrqgmXH3_7yklGvlJxODnVdLPWl_VtcUdXA" />
              <div>
                <p className="text-base font-black">@sarah_codes</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-black tracking-widest">Rust Expert</p>
              </div>
            </div>
            <span className="text-primary text-sm font-black">+2.4k</span>
          </div>
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <img alt="User" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzvP9kXJVyeHzqqP_pTTJzoX5KY2r4-nxQCfkATQy2AIx6vB2uPWPcXgSI49IRr0slrCXbBOOFa9P550WJNCHA2K2Z4WW1tPIjdZNSj_-Wa0-3DneAJ2XVebJP2FEhLue0GaTfXmXxj5sh1XUi3IX9cdL5mA3vGRuuORJJ34HlnnLilWS__emdUusgOadPpuxgHJpmsd_rksbkF7I3SG69cLod2-3YBZxevoyVos7e8_-dhIn9XxmZ9I6_X2w16ajwwazJqiWKmQ" />
              <div>
                <p className="text-base font-black">@dev_guru</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-black tracking-widest">Web3 Guru</p>
              </div>
            </div>
            <span className="text-primary text-sm font-black">+1.8k</span>
          </div>
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <img alt="User" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS-TUH1c803zs0bjDHX4dF0JjOEgXGgoUEB43-CJd_IKaVcmVWLzcarPKNI8jbg6iRFcm3qMCBCMZj1gs5TlmqHDtG18g2uRiyc6TXsOe5jJzM4KbLhOlQTJA40ras_Ml0OCJgBxqUvoHUqiQ4U9vUlP8aqRV5voKHSiS9x6WW04nAsOh146k2JNfxAtyi-pLlZsIw6l8wtlNtpxnL1BeFoDEbkSiTHgzC5u-NyGEqgEEdYW4nyhwJI8N5v5D7YZ8DikadjowrkQ" />
              <div>
                <p className="text-base font-black">@v_scale</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-black tracking-widest">Architect</p>
              </div>
            </div>
            <span className="text-primary text-sm font-black">+1.1k</span>
          </div>
        </div>
      </section>

      <section className="mt-16 bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10">
        <h5 className="text-3xl font-black mb-3 tracking-tight">Build Together.</h5>
        <p className="text-base text-on-surface-variant mb-8 leading-relaxed font-medium">Upgrade to Sanctum Pro for private collectives and unlimited repository integrations.</p>
        <button className="w-full bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em]">Go Premium</button>
      </section>
    </main></>
  );
}