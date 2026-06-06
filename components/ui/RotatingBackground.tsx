'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, registerGSAP } from '@/lib/gsap'

const WORDS = [
  'Kotlin', 'KMP', 'Java', 'Android SDK', 'Jetpack Compose', 'Compose Multiplatform',
  'Material 3', 'Coroutines', 'Flow', 'Room DB', 'Retrofit', 'Ktor', 'Stripe SDK',
  'Firebase', 'MapLibre SDK', 'Baato Maps', 'Gradle', 'MVVM', 'Clean Architecture',
  'Play Store', 'Google Play Console', 'iOS', 'Swift', 'UIKit', 'Location Tracking',
  'GPS', 'GIS', 'Offline First', 'GitHub', 'JSON', 'REST API', 'Maps API', 'MVVM Pattern',
  'Koin DI', 'SQLite', 'Hilt', 'Shared Logic', 'Mobile Craft', 'UI Polish', 'Performance'
]

interface WordParams {
  baseX: number
  baseY: number
  ampX: number
  ampY: number
  freqX: number
  freqY: number
  phaseX: number
  phaseY: number
}

export default function RotatingBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    const container = containerRef.current
    if (!container) return

    const wordEls = Array.from(container.querySelectorAll('[data-word]')) as HTMLElement[]

    // Compute random curve params per word (client-only)
    const params: WordParams[] = wordEls.map(() => ({
      baseX:  5 + Math.random() * 88,        // starting x (% vw), keep within bounds
      baseY:  5 + Math.random() * 88,        // starting y (% vh)
      ampX:   8 + Math.random() * 16,        // how far to drift horizontally (vw)
      ampY:   6 + Math.random() * 12,        // how far to drift vertically (vh)
      freqX:  0.3 + Math.random() * 1.1,    // sinusoidal cycles over full scroll
      freqY:  0.25 + Math.random() * 0.9,
      phaseX: Math.random() * Math.PI * 2,  // random starting phase
      phaseY: Math.random() * Math.PI * 2,
    }))

    const isMobile = window.innerWidth < 768

    // Per-word base opacity (stored for fade calculations)
    const baseOpacities: number[] = []

    // Set initial positions and make visible
    wordEls.forEach((el, i) => {
      const p = params[i]
      const x = p.baseX + p.ampX * Math.sin(p.phaseX)
      const y = p.baseY + p.ampY * Math.cos(p.phaseY)
      const opacity = isMobile ? (0.05 + Math.random() * 0.03) : (0.17 + Math.random() * 0.06)
      baseOpacities.push(opacity)
      gsap.set(el, {
        left: `${x}vw`,
        top:  `${y}vh`,
        opacity,
        fontSize: isMobile ? `${7 + Math.random() * 2}px` : `${13 + Math.random() * 3}px`,
      })
    })

    // Scroll-driven curved motion
    const stMotion = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2.5,
      onUpdate: (self) => {
        const progress = self.progress
        wordEls.forEach((el, i) => {
          const p = params[i]
          const x = p.baseX + p.ampX * Math.sin(progress * Math.PI * 2 * p.freqX + p.phaseX)
          const y = p.baseY + p.ampY * Math.cos(progress * Math.PI * 2 * p.freqY + p.phaseY)
          gsap.set(el, { left: `${x}vw`, top: `${y}vh` })
        })
      },
    })

    // Fade words out as user scrolls past the hero scene (~first 13% of total scroll)
    const stFade = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: '13% top',
      scrub: 1.5,
      onUpdate: (self) => {
        // 1 → 0.5 multiplier (words settle at half hero opacity after scrolling)
        const multiplier = 1 - self.progress * 0.5
        wordEls.forEach((el, i) => {
          gsap.set(el, { opacity: baseOpacities[i] * multiplier })
        })
      },
    })

    return () => { stMotion.kill(); stFade.kill() }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {WORDS.map((word, i) => (
        <span
          key={i}
          data-word=""
          className="absolute font-mono text-ink whitespace-nowrap opacity-0"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}
