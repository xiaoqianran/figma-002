import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#ebe3f5] py-12 sm:py-20">
      {/* Subtle geometric background ornaments */}
      <div className="absolute inset-0 opacity-40 pointer-events-none"
           style={{
             backgroundImage: `
               radial-gradient(circle at 78% 22%, #c9b9eb 0%, transparent 55%),
               radial-gradient(circle at 85% 68%, #b8a4e0 0%, transparent 50%)
             `
           }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid md:grid-cols-12 gap-x-8 items-center relative">
        {/* Left Content */}
        <div className="md:col-span-7 pt-6 sm:pt-8 pb-10 sm:pb-16">
          {/* Logo */}
          <div className="mb-6 sm:mb-9 flex items-center gap-3">
            <div className="w-16 h-16 sm:w-[104px] sm:h-[104px] bg-[#7460e1] rounded-xl sm:rounded-[19px] flex items-center justify-center shadow-inner relative">
              <svg width="40" height="40" viewBox="0 0 62 62" fill="none" className="sm:w-[62px] sm:h-[62px]">
                <path d="M16 14 L 29 31 L 29 48 L 24 48 L 24 33 L 11 16 Z" fill="white"/>
                <path d="M46 14 L 33 31 L 33 48 L 38 48 L 38 33 L 51 16 Z" fill="white"/>
                <path d="M19 18 L 28 30 L 28 45 L 25 45 L 25 32 L 16 20 Z" fill="#a89be8" opacity="0.6"/>
              </svg>
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-[3px] text-[#2c4364]/70 font-medium">PREMIUM VPN UI KIT</div>
          </div>

          {/* Title */}
          <h1 className="hero-title mb-3">Yeki VPN App</h1>
          
          <div className="text-[#2c4364] text-[32px] sm:text-[44px] md:text-[56px] font-semibold tracking-[-1.5px] mb-2 sm:mb-3 leading-[0.95]">VPN App UI Kit</div>
          
          <div className="text-[#5a6981] text-[28px] sm:text-[38px] md:text-[52px] font-normal tracking-[-0.6px] leading-[0.95]">
            50+ High Quality Screens
          </div>

          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link 
              to="/lab" 
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-9 h-12 sm:h-14 rounded-2xl bg-[#2c4364] text-white text-base sm:text-lg font-semibold hover:bg-black active:bg-black/90 active:scale-[0.985] transition"
            >
              进入交互原型实验室
            </Link>
            <Link 
              to="/design-system" 
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 sm:px-8 h-12 sm:h-14 rounded-2xl border border-[#2c4364]/30 text-[#2c4364] text-base sm:text-lg font-medium hover:bg-white/60 active:bg-white/80 active:scale-[0.985] transition"
            >
              查看设计系统
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 text-sm text-[#2c4364]/60">
            完整复刻自 Figma 设计稿 · 支持真实交互流程
          </div>

          <div className="mt-4 text-sm">
            <a 
              href="https://xiaoqianran.github.io/figma-002/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#7460e1] hover:text-[#5a47b8] font-medium underline-offset-4 hover:underline"
            >
              🌐 在线演示（GitHub Pages）→
            </a>
          </div>
        </div>

        {/* Right Side - Mini Phone Teaser (hidden on mobile for clean layout) */}
        <div className="hidden md:flex md:col-span-5 justify-center md:justify-end mt-8 md:mt-0">
          <div className="scale-[0.78] origin-top md:origin-top-right">
            <div className="w-[375px] h-[812px] rounded-[60px] p-3 shadow-[0_70px_120px_-30px_rgb(0,0,0,0.35)]"
                 style={{ background: 'linear-gradient(#1a1a1f, #111113)' }}>
              <div className="w-full h-full rounded-[52px] overflow-hidden bg-[#1f1b40] relative border border-black/60">
                {/* Mini connected screen teaser */}
                <div className="pt-12 px-6 text-center text-white">
                  <div className="text-[10px] tracking-[2px] text-white/60">CONNECTED</div>
                  <div className="text-6xl font-bold tracking-[-2.5px] mt-1">00:21:42</div>
                  <div className="text-xs text-[#d2b36e] mt-1">You have 1 hour and 49 minutes left</div>
                  
                  <div className="my-8 mx-auto w-28 h-28 rounded-full bg-[#a89be8] flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <div className="w-7 h-7 bg-[#2a2554] rounded" />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 text-left text-black text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold">SG</div>
                        <div>Singapore</div>
                      </div>
                      <div className="text-xs px-3 py-0.5 bg-[#7460e1] text-white rounded-full">Change</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
