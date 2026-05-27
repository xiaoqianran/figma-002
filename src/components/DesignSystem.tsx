import { useState } from 'react'

export function DesignSystem() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1600)
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(key)
      setTimeout(() => setCopied(null), 1600)
    }
  }

  // ============================================
  // Prominent Live Demo Link (About / Project Info)
  // ============================================
  const LiveDemoBanner = (
    <div className="mb-8 p-5 bg-[#7460e1]/10 border border-[#7460e1]/30 rounded-3xl flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1">
        <div className="font-semibold text-[#2c4364] mb-1">在线演示</div>
        <div className="text-sm text-[#5a6981]">
          本项目已完整部署至 GitHub Pages，可直接体验所有交互流程。
        </div>
      </div>
      <a
        href="https://xiaoqianran.github.io/figma-002/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 bg-[#7460e1] hover:bg-[#6652d1] text-white font-semibold rounded-2xl active:scale-[0.985] transition whitespace-nowrap"
      >
        打开在线演示 →
      </a>
    </div>
  )

  // ============================================
  // FULL DESIGN TOKENS — Expanded from tokens.css
  // ============================================
  const colorGroups = [
    {
      title: 'Brand — Slate Purple',
      desc: 'Primary accent and interactive elements',
      colors: [
        { name: 'Purple 50', hex: '#f4f0fa', cssVar: '--yeki-purple-50' },
        { name: 'Purple 100', hex: '#ebe3f5', cssVar: '--yeki-purple-100' },
        { name: 'Purple 200', hex: '#d4c9f0', cssVar: '--yeki-purple-200' },
        { name: 'Purple 300', hex: '#c9b9eb', cssVar: '--yeki-purple-300' },
        { name: 'Purple 400', hex: '#b8a4e0', cssVar: '--yeki-purple-400' },
        { name: 'Purple 500', hex: '#7460e1', cssVar: '--yeki-purple-500', primary: true },
        { name: 'Purple 600', hex: '#6652d1', cssVar: '--yeki-purple-600' },
        { name: 'Purple 700', hex: '#5a47b8', cssVar: '--yeki-purple-700' },
      ]
    },
    {
      title: 'Neutrals — Rhino',
      desc: 'Text, icons and deep surface hierarchy',
      colors: [
        { name: 'Rhino 400', hex: '#5a6981', cssVar: '--yeki-rhino-400' },
        { name: 'Rhino 500', hex: '#2c4364', cssVar: '--yeki-rhino-500', primary: true },
        { name: 'Rhino 600', hex: '#1f334f', cssVar: '--yeki-rhino-600' },
        { name: 'Rhino 700', hex: '#16253a', cssVar: '--yeki-rhino-700' },
      ]
    },
    {
      title: 'App Surfaces — Dark Theme',
      desc: 'Core backgrounds and elevated containers',
      colors: [
        { name: 'App BG', hex: '#18153a', cssVar: '--app-bg', primary: true },
        { name: 'App Surface', hex: '#1f1b40', cssVar: '--app-surface' },
        { name: 'App Surface 2', hex: '#25214a', cssVar: '--app-surface-2' },
        { name: 'App Card (Light)', hex: '#ffffff', cssVar: '--app-card' },
      ]
    },
    {
      title: 'Functional — Status & Feedback',
      desc: 'Success, warning, danger states',
      colors: [
        { name: 'Success', hex: '#10b981', cssVar: '--success' },
        { name: 'Warning', hex: '#f59e0b', cssVar: '--warning' },
        { name: 'Danger', hex: '#ef4444', cssVar: '--danger' },
      ]
    }
  ]

  // ============================================
  // TYPOGRAPHY SCALE — Real values from the app
  // ============================================
  const typographyScale = [
    {
      name: 'Hero / Display',
      size: '56–92px',
      weight: '800',
      tracking: '-0.055em / -4.5px',
      className: 'hero-title / text-[56px] font-extrabold tracking-[-4.5px]',
      family: 'Poppins / Clash Display',
      example: 'Yeki VPN App',
      usage: 'Landing hero, large marketing titles',
      previewClass: 'text-[28px] sm:text-[36px] md:text-[56px] font-extrabold tracking-[-2px] sm:tracking-[-3.2px] text-[#2c4364] leading-none'
    },
    {
      name: 'Heading 1',
      size: '32–48px',
      weight: '700 / 600',
      tracking: '-2.5px to -1.5px',
      className: 'text-5xl / text-4xl font-semibold tracking-tighter',
      family: 'Poppins',
      example: 'Prototype Lab',
      usage: 'Page titles in Lab & Gallery',
      previewClass: 'text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.5px] sm:tracking-[-2px] text-white'
    },
    {
      name: 'Heading 2',
      size: '24–28px',
      weight: '600',
      tracking: '-1.2px',
      className: 'text-3xl / text-[28px] font-semibold tracking-[-1.2px]',
      family: 'Inter / Poppins',
      example: 'Choose Location',
      usage: 'Section headers, screen titles',
      previewClass: 'text-2xl sm:text-3xl font-semibold tracking-[-1px] sm:tracking-[-1.2px] text-white'
    },
    {
      name: 'Body / Large',
      size: '17–20px',
      weight: '500 / 600',
      tracking: '-0.2px',
      className: 'text-lg / text-[17px] font-medium',
      family: 'Inter',
      example: '50+ High Quality Screens • Real-time interactions',
      usage: 'Primary body text, descriptions',
      previewClass: 'text-lg text-white/90'
    },
    {
      name: 'Body Base',
      size: '15px',
      weight: '500',
      tracking: 'normal',
      className: 'text-[15px] font-medium',
      family: 'Inter',
      example: 'You have 1 hour and 49 minutes left',
      usage: 'Cards, status text, most UI copy',
      previewClass: 'text-[15px] text-white/90'
    },
    {
      name: 'Label / Meta',
      size: '10–12px',
      weight: '500',
      tracking: '1.5px – 3.5px',
      className: 'text-xs / text-[11px] uppercase tracking-[2px] font-medium',
      family: 'Inter',
      example: 'CONNECTED  •  SPEED TEST',
      usage: 'Status labels, section headers, tabs',
      previewClass: 'text-[11px] uppercase tracking-[2.5px] text-[#a8a1d8] font-medium'
    },
    {
      name: 'Data / Numeric',
      size: '42px',
      weight: '600',
      tracking: '-2.5px to -4px',
      className: 'text-[42px] font-semibold tabular-nums tracking-[-3px]',
      family: 'Inter / mono + Clash',
      example: '00:42:18  •  48.2',
      usage: 'Timers, speed values, big stats',
      previewClass: 'text-[32px] sm:text-[42px] font-semibold tabular-nums tracking-[-2px] sm:tracking-[-3px] text-white font-mono'
    },
    {
      name: 'Small / Caption',
      size: '9–11px',
      weight: '400 / 500',
      tracking: '1px – 2px',
      className: 'text-[10px] text-white/50 tracking-[1px]',
      family: 'Inter',
      example: 'Results saved to Statistics',
      usage: 'Footers, helper text, micro labels',
      previewClass: 'text-[10px] text-white/50 tracking-[1px]'
    }
  ]

  // ============================================
  // COMPONENT PREVIEWS — Interactive & faithful
  // ============================================
  // Interactive states for demos
  const [buttonPressed, setButtonPressed] = useState<string | null>(null)
  const [selectedServerId, setSelectedServerId] = useState('sg')
  const [inputValue, setInputValue] = useState('Alex Chen')
  const [isConnectedDemo, setIsConnectedDemo] = useState(true)

  const demoServers = [
    { id: 'sg', name: 'Singapore', country: 'Singapore', flag: '🇸🇬', ping: 12 },
    { id: 'jp', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', ping: 28 },
    { id: 'hk', name: 'Hong Kong', country: 'Hong Kong', flag: '🇭🇰', ping: 19 },
  ]

  const handleButtonDemo = (id: string) => {
    setButtonPressed(id)
    setTimeout(() => setButtonPressed(null), 280)
  }

  const handleServerSelect = (id: string) => {
    setSelectedServerId(id)
  }

  // ============================================
  // EXPORT HELPERS — High-quality token export for designers & devs
  // ============================================
  const generateCSSTokens = (): string => {
    let css = `/* Yeki VPN App UI Kit — Design Tokens (sourced from Figma "Yeki - VPN App UI KIT")\n   Generated from living Design System · React + Tailwind implementation */\n\n:root {\n`

    colorGroups.forEach((group) => {
      group.colors.forEach((color) => {
        css += `  ${color.cssVar}: ${color.hex};\n`
      })
    })

    // Core functional + typography tokens (from tokens.css + globals.css)
    css += `\n  /* Functional */\n  --success: #10b981;\n  --warning: #f59e0b;\n  --danger: #ef4444;\n\n  /* Typography Tokens */\n  --font-sans: 'Inter', system-ui, sans-serif;\n  --font-display: 'Poppins', system-ui, sans-serif;\n}\n`
    return css
  }

  const generateJSONTokens = (): string => {
    // Use a permissive shape for the export payload (keeps implementation simple & focused)
    const tokenObj = {
      meta: {
        source: 'Yeki - VPN App UI KIT (Figma)',
        generated: new Date().toISOString().slice(0, 10),
        note: 'Curated tokens powering the interactive showcase (dark theme + marketing surfaces)'
      },
      colors: {} as Record<string, string>,
      typography: {
        '--font-sans': "'Inter', system-ui, sans-serif",
        '--font-display': "'Poppins', system-ui, sans-serif",
      },
      functional: {
        '--success': '#10b981',
        '--warning': '#f59e0b',
        '--danger': '#ef4444',
      },
      typographyScale: [] as Array<Record<string, string>>
    }

    colorGroups.forEach((group) => {
      group.colors.forEach((color) => {
        tokenObj.colors[color.cssVar] = color.hex
      })
    })

    // Add representative typography scale samples
    tokenObj.typographyScale = typographyScale.map((t) => ({
      name: t.name,
      size: t.size,
      weight: t.weight,
      tracking: t.tracking,
      family: t.family,
      usage: t.usage,
    }))

    return JSON.stringify(tokenObj, null, 2)
  }

  const handleExport = async (type: 'css' | 'json') => {
    const text = type === 'css' ? generateCSSTokens() : generateJSONTokens()
    const key = type === 'css' ? 'export-css' : 'export-json'
    await copyToClipboard(text, key)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Premium Header */}
      <div className="border-b border-white/10 bg-zinc-950/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#7460e1] rounded-lg sm:rounded-xl flex items-center justify-center">
              <span className="font-bold text-lg sm:text-xl tracking-tighter">Y</span>
            </div>
            <div>
              <span className="font-semibold text-lg sm:text-xl tracking-tighter">Yeki</span>
              <span className="hidden sm:inline text-xs ml-1.5 px-1.5 py-0.5 rounded bg-white/10 align-middle">VPN</span>
            </div>
          </div>
          <div className="hidden sm:block text-xs sm:text-sm text-white/60 font-medium tracking-tight">Living UI Kit &amp; Design Tokens</div>
          <a href="#colors" className="text-xs sm:text-sm hover:text-[#7460e1] transition whitespace-nowrap">Jump to sections →</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Prominent Live Demo Link - About / Project Info */}
        {LiveDemoBanner}

        {/* Page Title */}
        <div className="mb-8 sm:mb-10">
          <div className="uppercase tracking-[3px] text-xs text-[#a8a1d8] mb-3">FROM FIGMA • IMPLEMENTED IN TOKENS.CSS</div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter mb-4">Design System</h1>
          <p className="max-w-3xl text-2xl text-white/70">
            The complete, living style guide for the Yeki VPN App UI Kit. 
            Every color, type, and component below is pulled directly from the production tokens and screens.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm">
            <div className="px-4 py-1.5 rounded-full border border-white/15 bg-white/5">50+ Screens</div>
            <div className="px-4 py-1.5 rounded-full border border-white/15 bg-white/5">Pixel-perfect Figma parity</div>
            <div className="px-4 py-1.5 rounded-full border border-white/15 bg-white/5">Fully interactive demos</div>
          </div>

          {/* Premium Token Export Bar — the requested high-value addition */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleExport('css')}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-[#7460e1]/50 hover:bg-white/5 active:scale-[0.985] text-sm font-medium transition"
              title="Copy a complete, ready-to-paste :root block with all color, functional and typography tokens"
            >
              <span className="text-[#a8a1d8] group-hover:text-white">⎘</span>
              Copy all tokens as CSS variables
            </button>
            <button
              onClick={() => handleExport('json')}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-[#7460e1]/50 hover:bg-white/5 active:scale-[0.985] text-sm font-medium transition"
              title="Copy structured JSON including colors, typography scale &amp; metadata for design tokens pipeline"
            >
              <span className="text-[#a8a1d8] group-hover:text-white">⎘</span>
              Export tokens as JSON
            </button>
            {copied === 'export-css' && <span className="ml-1 text-emerald-400 text-xs tracking-wide">CSS copied ✓</span>}
            {copied === 'export-json' && <span className="ml-1 text-emerald-400 text-xs tracking-wide">JSON copied ✓</span>}
          </div>
        </div>

        {/* ============================================ COLORS ============================================ */}
        <div id="colors" className="scroll-mt-20">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="font-semibold text-3xl tracking-tighter">Colors</div>
              <div className="text-white/60 mt-1">Complete token palette with instant copy support</div>
            </div>
            <div className="text-xs text-white/50 hidden md:block">Click any swatch or value to copy</div>
          </div>

          <div className="space-y-10">
            {colorGroups.map((group, gi) => (
              <div key={gi} className="bg-zinc-900 border border-white/10 rounded-3xl p-7">
                <div className="mb-5">
                  <div className="font-semibold text-xl tracking-tight">{group.title}</div>
                  <div className="text-sm text-white/60">{group.desc}</div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3">
                  {group.colors.map((color, ci) => {
                    const copyKey = `${gi}-${ci}`
                    const isCopied = copied === copyKey
                    const isCopiedHex = copied === `${copyKey}-hex`
                    const isCopiedVar = copied === `${copyKey}-var`

                    return (
                      <div 
                        key={ci} 
                        className="group rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 hover:border-white/25 transition-all duration-150 active:scale-[0.985]"
                      >
                        {/* Color Swatch */}
                        <button
                          onClick={() => copyToClipboard(color.hex, copyKey)}
                          className="w-full h-24 flex items-end justify-end p-3 relative"
                          style={{ backgroundColor: color.hex }}
                          aria-label={`Copy ${color.name} ${color.hex}`}
                        >
                          {color.primary && (
                            <div className="absolute top-2 left-2 text-[10px] px-2 py-px rounded bg-black/50 text-white/90 tracking-widest">PRIMARY</div>
                          )}
                          <div className={`text-[10px] px-2 py-px rounded font-mono transition ${isCopied ? 'bg-emerald-500 text-black' : 'bg-black/60 text-white/90 opacity-0 group-hover:opacity-100'}`}>
                            {isCopied ? 'COPIED' : 'COPY HEX'}
                          </div>
                        </button>

                        {/* Meta */}
                        <div className="p-3.5 text-sm">
                          <div className="font-semibold tracking-tight">{color.name}</div>
                          
                          <div className="flex items-center justify-between gap-2 mt-2">
                            {/* HEX */}
                            <button
                              onClick={() => copyToClipboard(color.hex, `${copyKey}-hex`)}
                              className="font-mono text-xs text-white/60 hover:text-[#7460e1] active:text-[#a89be8] transition flex items-center gap-1"
                              title="Copy HEX value"
                            >
                              {color.hex}
                              {isCopiedHex && <span className="text-emerald-400 text-[10px]">✓</span>}
                            </button>

                            {/* CSS Var */}
                            <button
                              onClick={() => copyToClipboard(color.cssVar, `${copyKey}-var`)}
                              className="font-mono text-[10px] text-white/40 hover:text-white/70 transition flex items-center gap-1"
                              title="Copy CSS variable"
                            >
                              {color.cssVar.replace('--', '')}
                              {isCopiedVar && <span className="text-emerald-400 text-[10px]">✓</span>}
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-xs text-white/40">
            All values are the official source of truth defined in <span className="font-mono">src/styles/tokens.css</span>. Use the CSS variables in production.
          </div>
        </div>

        {/* ============================================ TYPOGRAPHY ============================================ */}
        <div id="typography" className="mt-14 sm:mt-16 scroll-mt-16">
          <div className="mb-6">
            <div className="font-semibold text-3xl tracking-tighter">Typography</div>
            <div className="text-white/60 mt-1">Exact type scale and usage patterns extracted from every screen in the prototype</div>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-10">
            <div className="grid gap-9">
              {typographyScale.map((typo, index) => (
                <div key={index} className="grid md:grid-cols-12 gap-x-8 gap-y-3 items-start border-b border-white/10 pb-8 last:border-b-0 last:pb-0">
                  {/* Spec */}
                  <div className="md:col-span-5">
                    <div className="font-semibold tracking-tight text-lg">{typo.name}</div>
                    <div className="mt-1 text-sm text-white/60 space-y-0.5">
                      <div><span className="text-white/40">Size:</span> {typo.size}</div>
                      <div><span className="text-white/40">Weight:</span> {typo.weight} &nbsp;&nbsp; <span className="text-white/40">Tracking:</span> {typo.tracking}</div>
                      <div><span className="text-white/40">Family:</span> {typo.family}</div>
                    </div>
                    <div className="mt-3">
                      <code className="text-[10px] px-2.5 py-1 bg-black/60 rounded font-mono text-white/60 tracking-tight">{typo.className}</code>
                    </div>
                    <div className="mt-2 text-xs text-[#a8a1d8]">{typo.usage}</div>
                  </div>

                  {/* Live Preview */}
                  <div className="md:col-span-7">
                    {index === 0 ? (
                      // Marketing typography shown on its real light background for accurate contrast
                      <div className="bg-[#ebe3f5] rounded-2xl p-6 -mx-1">
                        <div className={typo.previewClass} style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}>
                          {typo.example}
                        </div>
                        <div className="mt-3 text-[#5a6981] text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-[-1px] sm:tracking-[-1.5px] leading-none">VPN App UI Kit</div>
                      </div>
                    ) : (
                      <div className={typo.previewClass} style={{ fontFamily: typo.family.includes('Poppins') || typo.name.includes('Hero') ? "'Poppins', system-ui, sans-serif" : undefined }}>
                        {typo.example}
                      </div>
                    )}

                    {/* Additional contextual examples */}
                    {index === 6 && (
                      <div className="mt-4 text-[32px] sm:text-[42px] font-semibold tabular-nums tracking-[-2px] sm:tracking-[-3px] text-[#a89be8]">12:48</div>
                    )}
                    {index === 3 && (
                      <div className="mt-3 text-base text-white/60">Real-time interactions in a beautiful dark interface.</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-xs text-white/50 max-w-2xl">
            All typography respects the font-feature-settings and tight tracking used across the marketing site and the iPhone prototype. 
            Large numeric values use tabular-nums for perfect alignment in speed tests and timers.
          </div>
        </div>

        {/* ============================================ COMPONENT EXAMPLES ============================================ */}
        <div id="components" className="mt-14 sm:mt-16 scroll-mt-16">
          <div className="mb-8">
            <div className="font-semibold text-3xl tracking-tighter">Component Examples</div>
            <div className="text-white/60 mt-1">Real, production-grade reusable patterns with interactive previews</div>
          </div>

          {/* BUTTONS */}
          <div className="mb-8">
            <div className="uppercase text-xs tracking-[2px] text-white/50 mb-3 px-1">Buttons</div>
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <div className="flex flex-wrap gap-3 items-center">
                {/* Primary Large (used in forms, save, start) */}
                <button 
                  onClick={() => handleButtonDemo('primary-large')}
                  className={`px-8 py-4 rounded-2xl bg-[#7460e1] hover:bg-[#6652d1] active:bg-[#6652d1] font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985] ${buttonPressed === 'primary-large' ? 'scale-[0.96] ring-2 ring-[#a89be8]/50' : ''}`}
                >
                  Save Changes
                </button>

                {/* Primary Pill / Compact (top nav, change server) */}
                <button 
                  onClick={() => handleButtonDemo('primary-pill')}
                  className={`text-sm font-semibold px-5 py-1.5 bg-[#7460e1] hover:bg-[#6652d1] text-white rounded-full active:scale-95 transition ${buttonPressed === 'primary-pill' ? 'scale-[0.94] ring-1 ring-[#a89be8]' : ''}`}
                >
                  Change
                </button>

                {/* Secondary / Outline */}
                <button 
                  onClick={() => handleButtonDemo('secondary')}
                  className={`px-6 py-3.5 rounded-2xl border border-white/20 text-white/90 font-medium active:bg-white/5 active:scale-[0.985] transition ${buttonPressed === 'secondary' ? 'bg-white/10' : ''}`}
                >
                  Cancel
                </button>

                {/* Ghost / Link style */}
                <button 
                  onClick={() => handleButtonDemo('ghost')}
                  className="inline-flex items-center gap-1.5 text-sm text-[#7460e1] active:text-violet-400 font-medium hover:underline underline-offset-2"
                >
                  Change Password →
                </button>

                {/* Small action badge-style */}
                <button 
                  onClick={() => handleButtonDemo('small')}
                  className="text-xs px-4 py-1 rounded-full bg-white/10 active:bg-white/20 transition font-medium"
                >
                  Manage →
                </button>

                {/* Disabled */}
                <button disabled className="px-8 py-4 rounded-2xl bg-[#7460e1]/50 font-semibold text-lg tracking-[-0.2px] cursor-not-allowed">
                  Disabled Primary
                </button>
              </div>
              <div className="text-[10px] text-white/40 mt-5">All buttons include the signature active:scale micro-interaction used throughout the app.</div>
            </div>
          </div>

          {/* CARDS & SURFACES */}
          <div className="mb-8">
            <div className="uppercase text-xs tracking-[2px] text-white/50 mb-3 px-1">Cards &amp; Surfaces</div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* White Server Card (light on dark) */}
              <div className="bg-white rounded-2xl p-4 text-black shadow-2xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center ring-1 ring-red-300/50">
                      <span className="text-[10px] text-white font-black tracking-tighter">🇸🇬</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[15px] tracking-[-0.3px]">Singapore</div>
                      <div className="text-emerald-600 text-[11px] -mt-0.5 flex items-center gap-1.5">
                        <span>12ms</span><span className="text-emerald-400">•</span><span>优选</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[12px] font-semibold px-4 py-1 bg-[#7460e1] text-white rounded-full">Change</div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 mt-4 pt-4 border-t text-sm">
                  <div>
                    <div className="text-emerald-600 flex items-center gap-1 text-[11px]"><span>↑</span> Upload</div>
                    <div className="font-semibold tabular-nums text-[15px]">2.47 <span className="font-normal text-xs text-gray-400">Mbps</span></div>
                  </div>
                  <div>
                    <div className="text-sky-600 flex items-center gap-1 text-[11px]"><span>↓</span> Download</div>
                    <div className="font-semibold tabular-nums text-[15px]">5.23 <span className="font-normal text-xs text-gray-400">Mbps</span></div>
                  </div>
                </div>
              </div>

              {/* Dark Glass Card (most common surface) */}
              <div className="bg-white/5 border border-white/10 rounded-3xl px-5 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium tracking-[-0.2px]">Pro Yearly</div>
                    <div className="text-xs text-white/50">Visa •••• 4242</div>
                  </div>
                  <div className="text-xs px-3 py-1 rounded-full bg-white/10 font-medium">Manage →</div>
                </div>
                <div className="text-[10px] text-white/40 mt-4">Active subscription • Renews automatically</div>
              </div>
            </div>
          </div>

          {/* INPUTS */}
          <div className="mb-8">
            <div className="uppercase text-xs tracking-[2px] text-white/50 mb-3 px-1">Form Inputs</div>
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 space-y-6">
              {/* Profile-style labeled input */}
              <div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="uppercase tracking-[1.5px] text-[10px] text-white/50 mb-1.5">DISPLAY NAME</div>
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-transparent text-[17px] font-medium outline-none placeholder:text-white/30"
                    placeholder="Your name"
                  />
                </div>
                <div className="text-[10px] text-white/40 mt-1.5 px-1">Live input — edits reflect immediately (same pattern as Edit Profile screen)</div>
              </div>

              {/* Search bar style */}
              <div className="relative max-w-sm">
                <input 
                  type="text" 
                  placeholder="Search servers..." 
                  className="w-full bg-white/10 placeholder-white/40 text-sm rounded-2xl pl-10 py-2.5 outline-none border border-white/10 focus:border-[#7460e1]"
                />
                <div className="absolute left-4 top-3 text-white/40">🔍</div>
              </div>
            </div>
          </div>

          {/* LIST ITEMS */}
          <div className="mb-8">
            <div className="uppercase text-xs tracking-[2px] text-white/50 mb-3 px-1">List Items &amp; Rows</div>
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-2">
              <div className="space-y-2">
                {demoServers.map((srv) => {
                  const active = selectedServerId === srv.id
                  return (
                    <button
                      key={srv.id}
                      onClick={() => handleServerSelect(srv.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all active:scale-[0.985] text-left
                        ${active 
                          ? 'bg-[#7460e1] text-white shadow-inner' 
                          : 'bg-white/5 hover:bg-white/10'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{srv.flag}</div>
                        <div>
                          <div className="font-medium">{srv.name}</div>
                          <div className="text-[10px] opacity-70">{srv.country}</div>
                        </div>
                      </div>
                      <div className="text-right text-xs tabular-nums">
                        <div className="font-semibold">{srv.ping}ms</div>
                        <div className="opacity-60">34%</div>
                      </div>
                    </button>
                  )
                })}
              </div>
              <div className="px-4 pt-3 pb-1 text-[10px] text-white/40">Selectable list rows — exact styling from Server List screen</div>
            </div>
          </div>

          {/* STATUS BADGES & INDICATORS */}
          <div className="mb-8">
            <div className="uppercase text-xs tracking-[2px] text-white/50 mb-3 px-1">Status Badges &amp; Indicators</div>
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <div className="flex flex-wrap gap-x-6 gap-y-4 items-center">
                {/* PRO Badge */}
                <div className="inline-block text-xs px-3 py-0.5 bg-gradient-to-r from-[#7460e1] to-violet-600 rounded-full font-medium">PRO MEMBER</div>

                {/* Connected pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> CONNECTED
                </div>

                {/* Rating badges */}
                <div className="text-xs font-semibold tracking-[1.5px] text-emerald-400">EXCELLENT</div>
                <div className="text-xs font-semibold tracking-[1.5px] text-sky-400">VERY GOOD</div>
                <div className="text-xs font-semibold tracking-[1.5px] text-amber-400">GOOD</div>

                {/* Success circle */}
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center ring-1 ring-emerald-500/30">
                  <span className="text-emerald-400 text-xl">✓</span>
                </div>

                {/* Disconnected style */}
                <div className="uppercase tracking-[3.5px] text-[11px] text-[#a8a1d8] font-medium">DISCONNECTED</div>
              </div>
            </div>
          </div>

          {/* SPECIAL / SIGNATURE ELEMENTS */}
          <div>
            <div className="uppercase text-xs tracking-[2px] text-white/50 mb-3 px-1">Signature App Elements</div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Mini Connect Control */}
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 flex flex-col items-center">
                <div className="text-xs text-white/50 mb-4 tracking-widest">LARGE ACTION CONTROL</div>
                <button
                  onClick={() => setIsConnectedDemo(!isConnectedDemo)}
                  className={`w-[108px] h-[108px] rounded-full active:scale-[0.965] transition-all flex items-center justify-center
                    ${isConnectedDemo 
                      ? 'bg-[#a89be8] shadow-[0_0_0_12px_#a89be820]' 
                      : 'bg-white/15 border-[3px] border-white/30'}`}
                >
                  <div className="w-[78px] h-[78px] bg-white rounded-full flex items-center justify-center shadow-xl">
                    <div className={`w-7 h-7 rounded-[4px] transition-all ${isConnectedDemo ? 'bg-[#2a2554]' : 'bg-emerald-600'}`} />
                  </div>
                </button>
                <div className="mt-4 text-xs text-white/50">Tap to toggle — matches ConnectedScreen exactly</div>
              </div>

              {/* Results list rows (Speedtest style) */}
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6">
                <div className="text-xs text-white/50 mb-3 tracking-widest px-1">RICH DATA ROWS</div>
                <div className="bg-white/5 rounded-3xl border border-white/10 px-1 py-1 text-sm">
                  {[
                    { label: 'Download', val: '47.8 Mbps', icon: '↓' },
                    { label: 'Upload', val: '19.3 Mbps', icon: '↑' },
                    { label: 'Ping', val: '14 ms', icon: '⚡' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-[13px] rounded-3xl mx-1 first:bg-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-2xl flex items-center justify-center bg-[#7460e1] text-white text-sm">{row.icon}</div>
                        <div className="font-medium">{row.label}</div>
                      </div>
                      <div className="font-semibold tabular-nums tracking-[-0.3px]">{row.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 text-sm text-white/40 flex flex-col md:flex-row md:items-center gap-x-4 gap-y-2">
          <div>This is a living document. Every element above is built with the exact classes and tokens powering the rest of the site.</div>
          <div className="md:ml-auto text-xs">Last updated • Batch 4 — Design System Expansion</div>
        </div>
      </div>
    </div>
  )
}
