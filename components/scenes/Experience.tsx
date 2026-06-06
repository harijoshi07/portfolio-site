'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

/* ── Company illustrations ─────────────────────────────────────── */

function MapNavigationIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full h-20">
      <style>{`
        @keyframes drawRoute {
          0% { stroke-dashoffset: 160; }
          70%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes gpsPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes carMove {
          0% { offset-distance: 0%; }
          70%, 100% { offset-distance: 100%; }
        }
      `}</style>
      <svg viewBox="0 0 120 80" className="w-36 h-20" fill="none">
        {/* Map grid lines */}
        {[15, 30, 45, 60].map(y => (
          <line key={y} x1="10" y1={y} x2="110" y2={y} stroke="var(--ink)" strokeWidth="0.3" opacity="0.1" />
        ))}
        {[25, 45, 65, 85, 105].map(x => (
          <line key={x} x1={x} y1="10" x2={x} y2="70" stroke="var(--ink)" strokeWidth="0.3" opacity="0.1" />
        ))}

        {/* Road map backdrop path */}
        <path
          d="M 15 50 Q 40 20, 65 50 T 105 35"
          stroke="var(--ink)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.1"
        />

        {/* GPS Active Route */}
        <path
          d="M 15 50 Q 40 20, 65 50 T 105 35"
          stroke="var(--orange)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="160"
          style={{ animation: 'drawRoute 3s ease-in-out infinite' }}
        />

        {/* GPS location marker / target */}
        <g transform="translate(105, 35)">
          <circle r="6" fill="var(--orange)" opacity="0.3" style={{ animation: 'gpsPulse 1.5s ease-out infinite' }} />
          <circle r="3" fill="var(--orange)" />
        </g>

        {/* Moving Vehicle Dot */}
        <circle r="4" fill="var(--ink)" stroke="var(--cream)" strokeWidth="1.5"
          style={{
            animation: 'carMove 3s ease-in-out infinite',
            motionPath: 'path("M 15 50 Q 40 20, 65 50 T 105 35")',
            offsetPath: 'path("M 15 50 Q 40 20, 65 50 T 105 35")'
          }}
        />

        {/* Telemetry Labels */}
        <text x="12" y="20" fill="var(--orange)" fontSize="5.5" fontFamily="monospace" opacity="0.7">
          MapLibre SDK
        </text>
        <text x="12" y="72" fill="var(--ink)" fontSize="5" fontFamily="monospace" opacity="0.4">
          GPS · Real-time Routing
        </text>
      </svg>
    </div>
  )
}

function PaymentIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full h-20">
      <style>{`
        @keyframes cardSwipe {
          0% { transform: translate(-35px, 15px) rotate(-10deg); opacity: 0; }
          20% { opacity: 1; }
          50%, 100% { transform: translate(15px, -15px) rotate(5deg); opacity: 0; }
        }
        @keyframes networkPulse {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes statusSuccess {
          0%, 60% { opacity: 0; transform: scale(0.6); }
          75%, 100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <svg viewBox="0 0 120 75" className="w-36 h-20" fill="none">
        {/* Terminal/Phone Frame */}
        <rect x="35" y="8" width="50" height="58" rx="6" fill="var(--ink)" fillOpacity="0.08" stroke="var(--ink)" strokeOpacity="0.2" strokeWidth="1" />
        <rect x="53" y="11" width="14" height="2" rx="1" fill="var(--ink)" opacity="0.2" />

        {/* Stripe Credit Card Swipe Animation */}
        <g style={{ animation: 'cardSwipe 3s ease-in-out infinite' }}>
          <rect x="30" y="30" width="32" height="18" rx="2" fill="var(--orange)" opacity="0.9" />
          <rect x="30" y="34" width="32" height="3" fill="var(--ink)" opacity="0.8" />
          <circle cx="56" cy="42" r="2.5" fill="var(--cream)" opacity="0.5" />
        </g>

        {/* Billing/Payment Status Check */}
        <g style={{ animation: 'statusSuccess 3s ease-in-out infinite' }}>
          <circle cx="60" cy="38" r="10" fill="#2d6a4f" opacity="0.9" />
          <polyline points="55,38 58,41 65,34" stroke="var(--cream)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Network Ktor API Line */}
        <path d="M 15 38 L 35 38" stroke="var(--orange)" strokeWidth="1" strokeDasharray="4 4"
          style={{ animation: 'networkPulse 1.5s linear infinite' }} />
        <path d="M 85 38 L 105 38" stroke="var(--orange)" strokeWidth="1" strokeDasharray="4 4"
          style={{ animation: 'networkPulse 1.5s linear infinite' }} />

        {/* Labels */}
        <text x="12" y="68" fill="var(--orange)" fontSize="5.5" fontFamily="monospace" opacity="0.7">
          Ktor API
        </text>
        <text x="76" y="68" fill="var(--ink)" fontSize="5.5" fontFamily="monospace" opacity="0.4">
          Stripe SDK
        </text>
      </svg>
    </div>
  )
}

const ILLUSTRATIONS = [
  MapNavigationIllustration,
  PaymentIllustration,
]

export default function Experience() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const cards = cardsRef.current?.querySelectorAll('[data-card]') ?? []
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
        tl.fromTo(headlineRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
        cards.forEach((card, i) => {
          tl.fromTo(card, { opacity: 0, x: 60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'power2.out' }, i === 0 ? '-=0.1' : '-=0.15')
        })
      }, sectionRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        const cards = cardsRef.current?.querySelectorAll('[data-card]') ?? []
        gsap.fromTo(headlineRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
        cards.forEach((card, i) => {
          gsap.fromTo(card, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: i * 0.08,
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
          })
        })
      }, sectionRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="flex flex-col items-center justify-center w-full min-h-screen md:h-screen px-6 md:px-8 py-20 md:py-16"
    >
      {/* Headline */}
      <div ref={headlineRef} className="w-full max-w-5xl mb-10 opacity-0">
        <p className="font-mono text-xs tracking-widest uppercase text-orange mb-2">Experience</p>
        <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.8rem)] text-ink leading-none">
          Professional experience across{' '}
          <span className="text-gray">mapping workflows and transactional products.</span>
        </h2>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-5xl">
        {content.experience.map((item, i) => {
          const Illustration = ILLUSTRATIONS[i]
          return (
            <div
              key={i}
              data-card=""
              className="opacity-0 flex flex-col border border-ink/10 rounded-2xl p-7 hover:border-orange/30 transition-colors duration-300 group"
            >
              {/* Illustration */}
              <div className="mb-4">
                <Illustration />
              </div>

              {/* Company */}
              <p className="font-display font-bold text-xl text-ink leading-tight group-hover:text-orange transition-colors duration-200">
                {item.company}
              </p>

              {/* Role */}
              <p className="font-mono text-xs text-gray mt-1 leading-relaxed">
                {item.role}
              </p>

              {/* Headline */}
              <p className="font-body text-sm text-gray/80 mt-3 leading-relaxed">
                {item.headline}
              </p>

              {/* Period + location */}
              <div className="mt-auto pt-6 border-t border-ink/8 flex flex-col gap-0.5">
                <p className="font-mono text-[11px] text-gray/70">{item.period}</p>
                <p className="font-mono text-[11px] text-gray/50">{item.location}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
