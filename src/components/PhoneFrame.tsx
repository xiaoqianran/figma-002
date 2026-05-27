import type { ReactNode } from 'react'
import { useState } from 'react'

interface PhoneFrameProps {
  children: ReactNode
  /** Enable mouse/touch interactive 3D tilt (highly recommended in Prototype Lab) */
  tilt?: boolean
  /** Show realistic rear camera bump that reacts to tilt */
  showCamera?: boolean
}

export function PhoneFrame({ children, tilt = true, showCamera = true }: PhoneFrameProps) {
  const [rotation, setRotation] = useState({ x: -6, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    setRotation({ x, y })
  }

  const resetTilt = () => tilt && setRotation({ x: -6, y: 0 })

  const tiltStyle = tilt
    ? { transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, transition: 'transform 0.08s linear' }
    : { transform: 'rotate(-6deg)' }

  return (
    <div
      className="relative mx-auto select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={tiltStyle}
    >
      {/* iPhone 14 Pro Frame — Upgraded Fidelity (inspired by high-fidelity spec) */}
      <div
        className="relative w-[375px] h-[812px] rounded-[62px] p-[11px]"
        style={{
          background: 'linear-gradient(155deg, #232327 0%, #0f0f12 45%, #1a1a1f 100%)',
          boxShadow: '0 0 0 13px #111113, 0 80px 130px -25px rgb(0 0 0 / 0.65), 0 45px 80px -18px rgb(0 0 0 / 0.5)',
        }}
      >
        <div className="relative w-full h-full rounded-[52px] overflow-hidden border border-[#1f1f22] bg-black shadow-inner">
          
          {/* Screen Viewport — fixed device height with proper scrolling support.
              This restores the contract that all Lab screens were built against (h-full + flex layouts)
              while still allowing tall content (e.g. Pro Yearly details) to scroll. */}
          <div className="absolute inset-[2px] rounded-[50px] overflow-hidden bg-[#18153a]">
            {/* 
              min-h-full + overflow-y-auto is the standard "best of both worlds" pattern for device emulators:
              - Gives screens using h-full/flex layouts a proper height reference
              - Allows content taller than the phone (Pro Yearly details, long settings, etc.) to grow and be scrollable
            */}
            <div className="min-h-full w-full overflow-y-auto overscroll-contain pb-10 phone-viewport">
              {children}
            </div>
          </div>

          {/* Improved Dynamic Island */}
          <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[126px] h-[28px] bg-black rounded-full z-50 flex items-center justify-center ring-1 ring-white/10">
            <div className="w-[18px] h-[18px] bg-[#111] rounded-full relative">
              <div className="absolute inset-[3px] bg-[#222] rounded-full" />
              <div className="absolute inset-[6px] bg-[#0a0a0c] rounded-full" />
            </div>
          </div>

          {/* Tilt-responsive glass reflection */}
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none z-40"
            style={{
              background: `linear-gradient(${120 + rotation.y * 1.8}deg, rgba(255,255,255,0.09) 8%, transparent 32%, rgba(255,255,255,0.03) 68%)`,
            }}
          />

          {/* Rear camera bump (appears on tilt) */}
          {showCamera && (
            <div
              className="absolute -right-[4px] top-[52px] w-[28px] h-[28px] rounded-[8px] bg-gradient-to-br from-[#2a2a2f] to-[#111113] shadow-lg border border-white/10 z-50 transition-opacity"
              style={{ opacity: Math.min(1, Math.abs(rotation.y) / 9), transform: `rotateY(${rotation.y * 0.6}deg)` }}
            >
              <div className="absolute inset-[3px] grid grid-cols-2 gap-[2px] p-[2px]">
                <div className="bg-[#1a1a1f] rounded-full" />
                <div className="bg-[#1a1a1f] rounded-full" />
                <div className="bg-[#1a1a1f] rounded-full" />
                <div className="bg-[#333] rounded-full w-[5px] h-[5px] m-auto" />
              </div>
            </div>
          )}
        </div>

        {/* More realistic side buttons */}
        <div className="absolute -left-[6px] top-[92px] w-[5px] h-[18px] bg-gradient-to-r from-[#333] to-[#222] rounded-l" />
        <div className="absolute -left-[6px] top-[122px] w-[5px] h-[32px] bg-gradient-to-r from-[#333] to-[#222] rounded-l" />
        <div className="absolute -left-[6px] top-[160px] w-[5px] h-[32px] bg-gradient-to-r from-[#333] to-[#222] rounded-l" />
        <div className="absolute -right-[6px] top-[140px] w-[5px] h-[68px] bg-gradient-to-l from-[#333] to-[#222] rounded-r" />
      </div>
    </div>
  )
}

