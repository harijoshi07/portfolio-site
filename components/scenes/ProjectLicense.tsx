'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content, prefixPath } from '@/content'
import Image from 'next/image'

const project = content.projects[1]

const SCREENS = [
  '/screenshots/driving license/home_screen.jpg',
  '/screenshots/driving license/study_mode_screen.jpg',
  '/screenshots/driving license/exam_mode_screen.jpg',
  '/screenshots/driving license/answer_screen.jpg',
  '/screenshots/driving license/result_screen.jpg',
].map(prefixPath)

const PLAY_STORE_REVIEWS = [
  { text: "Really helpful for likhit exam preparation. All questions are covered!", author: "Ramesh K.", date: "5 Jan 2025" },
  { text: "Best app for driving license test in Nepal. Clean UI and offline mode is great.", author: "Sita Sharma", date: "12 Feb 2025" },
  { text: "Very useful for beginners. The study mode helped me pass on first try!", author: "Anish Thapa", date: "3 Mar 2025" },
  { text: "Covers all traffic signs and rules. Must have app before exam.", author: "Priya Gurung", date: "18 Mar 2025" },
  { text: "Simple, fast, no ads. Perfect exam companion for driving license.", author: "Bikash Poudel", date: "2 Apr 2025" },
]

const APP_STORE_REVIEWS = [
  { text: "Great app for anyone preparing for Nepal driving license exam.", author: "Sunita M.", date: "10 Jan 2025" },
  { text: "Offline quiz mode is a lifesaver. Used it on the bus everyday!", author: "Dipak Rai", date: "25 Feb 2025" },
  { text: "Clean Material 3 design. Love the dark mode support.", author: "Aasha B.", date: "8 Mar 2025" },
  { text: "Helped me understand all the traffic rules easily.", author: "Kiran Shrestha", date: "20 Mar 2025" },
  { text: "Really great app for prep. Highly recommended!", author: "Bikram Sen", date: "10 Apr 2025" },
]

export default function ProjectLicense() {
  const sectionRef = useRef<HTMLElement>(null)
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const screen2Ref = useRef<HTMLDivElement>(null)
  const screen3Ref = useRef<HTMLDivElement>(null)
  const screen4Ref = useRef<HTMLDivElement>(null)
  const screen5Ref = useRef<HTMLDivElement>(null)
  const ctaWrapperRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=350%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        })

        // Initial positions setup: Top row starts on left, Bottom row starts on right (for 5 cards, offset is 1432px)
        gsap.set(topRowRef.current, { x: -1432 })
        gsap.set(bottomRowRef.current, { x: 1432 })
        gsap.set(screen2Ref.current, { y: '100%' })
        gsap.set(screen3Ref.current, { y: '100%' })
        gsap.set(screen4Ref.current, { y: '100%' })
        gsap.set(screen5Ref.current, { y: '100%' })
        gsap.set(ctaWrapperRef.current, { opacity: 0, scale: 0.9, y: 20 })

        if (arrowRef.current) {
          const pathLength = arrowRef.current.getTotalLength()
          gsap.set(arrowRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength })
        }

        // --- STEP 1 -> STEP 2 (Scroll progress 0.15 to 0.3) ---
        tl.to(topRowRef.current, { x: -1068, ease: 'power3.inOut', duration: 0.15 }, 0.15)
        tl.to(bottomRowRef.current, { x: 1068, ease: 'power3.inOut', duration: 0.15 }, 0.15)
        tl.to(screen2Ref.current, { y: '0%', ease: 'power3.inOut', duration: 0.15 }, 0.15)

        // --- STEP 2 -> STEP 3 (Scroll progress 0.35 to 0.5) ---
        tl.to(topRowRef.current, { x: -704, ease: 'power3.inOut', duration: 0.15 }, 0.35)
        tl.to(bottomRowRef.current, { x: 704, ease: 'power3.inOut', duration: 0.15 }, 0.35)
        tl.to(screen3Ref.current, { y: '0%', ease: 'power3.inOut', duration: 0.15 }, 0.35)

        // --- STEP 3 -> STEP 4 (Scroll progress 0.55 to 0.7) ---
        tl.to(topRowRef.current, { x: -340, ease: 'power3.inOut', duration: 0.15 }, 0.55)
        tl.to(bottomRowRef.current, { x: 340, ease: 'power3.inOut', duration: 0.15 }, 0.55)
        tl.to(screen4Ref.current, { y: '0%', ease: 'power3.inOut', duration: 0.15 }, 0.55)

        // --- STEP 4 -> STEP 5 (Scroll progress 0.75 to 0.9) ---
        tl.to(topRowRef.current, { x: 24, ease: 'power3.inOut', duration: 0.15 }, 0.75)
        tl.to(bottomRowRef.current, { x: -24, ease: 'power3.inOut', duration: 0.15 }, 0.75)
        tl.to(screen5Ref.current, { y: '0%', ease: 'power3.inOut', duration: 0.15 }, 0.75)

        // --- SHOW CTA (Scroll progress 0.9 to 1.0) ---
        tl.to(ctaWrapperRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'back.out(1.2)',
          duration: 0.1,
        }, 0.9)

        if (arrowRef.current) {
          tl.to(arrowRef.current, { strokeDashoffset: 0, ease: 'power2.out', duration: 0.1 }, 0.92)
        }
      }, sectionRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-between w-full min-h-screen overflow-hidden bg-[#FAF8F5] py-8 md:py-16 border-b border-ink/5"
    >
      {/* Top Ticker: Play Store Reviews */}
      <div className="w-full relative flex justify-start md:justify-start overflow-x-auto md:overflow-hidden py-2 md:py-0 mb-4 md:mb-0 select-none pointer-events-auto md:pointer-events-none scrollbar-none">
        <div
          ref={topRowRef}
          className="flex gap-4 md:gap-6 items-center flex-row-reverse px-4 md:px-0"
        >
          {PLAY_STORE_REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2rem] p-6 w-[300px] md:w-[340px] h-[185px] md:h-[190px] shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-black/[0.04] flex-shrink-0 flex flex-col justify-between transition-all duration-300"
            >
              <p className="font-body text-xs md:text-sm text-[#1A1A1A] leading-relaxed font-normal">
                &ldquo;{rev.text}&rdquo;
              </p>
              <div>
                <div className="w-full h-[1px] bg-black/[0.06] mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-body text-sm font-bold text-[#1A1A1A] flex items-center gap-1.5">
                      {rev.author}
                      <span className="inline-flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#1DA1F2] text-white flex-shrink-0">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </span>
                    <span className="font-body text-[10px] text-[#8A8A8A] mt-0.5">{rev.date}</span>
                  </div>
                  <div className="bg-white border border-black/[0.06] rounded-xl px-2.5 py-1.5 flex flex-col items-center justify-center w-[72px] h-[72px] shadow-sm flex-shrink-0">
                    <div className="relative w-6 h-6">
                      <Image
                        src={prefixPath('/images/store-icons/play_store.png')}
                        alt="Play Store Logo"
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                    <span className="font-body text-[9px] font-bold text-[#8A8A8A] mt-1.5 tracking-tight">PlayStore</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 my-6 md:my-0 z-10 w-full max-w-4xl px-6">
        {/* Clean Floating Screen Mockup (No Bezel Border) */}
        <div className="relative flex justify-center items-center flex-shrink-0">
          <div className="relative w-[240px] md:w-[260px] h-[480px] md:h-[520px] rounded-[1.8rem] md:rounded-[2rem] overflow-hidden bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/5">
            {/* Screen 1 */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={SCREENS[0]}
                alt="Screen 1"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Screen 2 */}
            <div
              ref={screen2Ref}
              className="absolute inset-0 w-full h-full z-10"
              style={{ transform: 'translateY(100%)' }}
            >
              <Image
                src={SCREENS[1]}
                alt="Screen 2"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Screen 3 */}
            <div
              ref={screen3Ref}
              className="absolute inset-0 w-full h-full z-20"
              style={{ transform: 'translateY(100%)' }}
            >
              <Image
                src={SCREENS[2]}
                alt="Screen 3"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Screen 4 */}
            <div
              ref={screen4Ref}
              className="absolute inset-0 w-full h-full z-30"
              style={{ transform: 'translateY(100%)' }}
            >
              <Image
                src={SCREENS[3]}
                alt="Screen 4"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Screen 5 */}
            <div
              ref={screen5Ref}
              className="absolute inset-0 w-full h-full z-40"
              style={{ transform: 'translateY(100%)' }}
            >
              <Image
                src={SCREENS[4]}
                alt="Screen 5"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA Wrapper */}
        <div
          ref={ctaWrapperRef}
          className="opacity-100 md:opacity-0 md:absolute md:left-[calc(50%+160px)] md:top-1/2 md:-translate-y-1/2 flex flex-col items-center md:items-start text-center md:text-left mt-6 md:mt-0 w-full md:w-[260px] flex-shrink-0"
        >
          {/* Handwritten text */}
          <div className="relative flex flex-col items-center md:items-start mb-6 md:mb-8">
            <span className="font-display italic text-orange text-sm md:text-base font-bold tracking-wider -rotate-3 block">
              See my work live, install the app!
            </span>
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="text-orange mt-1 ml-4 -rotate-12 hidden md:block">
              <path
                ref={arrowRef}
                d="M10,2 C22,6 40,15 32,32"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M25,28 C28,30 30,31 32,32 C31,30 30,26 30,22"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Badges */}
          <div className="flex flex-row md:flex-col gap-3">
            {/* Google Play Button */}
            <a
              href={project.website || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white rounded-xl px-4 py-2 flex items-center gap-2.5 border border-neutral-800 hover:bg-neutral-900 transition-all shadow-md select-none hover:-translate-y-0.5"
              data-cursor-grow=""
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.25 3.03a1.5 1.5 0 0 0-1.5 1.5v14.94a1.5 1.5 0 0 0 1.5 1.5h.06l8.84-8.84v-.2L5.31 3.03h-.06z" fill="#EA4335" />
                <path d="M17.44 12.2l-3.35-3.35-8.84 8.84a1.5 1.5 0 0 0 1.5 1.5h.06l10.63-6.13c.48-.28.48-.96 0-1.24v.38z" fill="#FBBC05" />
                <path d="M5.25 3.03h.06l12.13 7a.71.71 0 0 1 0 1.24l-3.35-3.35-8.84-8.84c.48-.28.48-.96 0-1.24z" fill="#4285F4" />
                <path d="M14.09 8.85l3.35 3.35c.48.28.48.96 0 1.24L14.09 14.8v-5.95z" fill="#34A853" />
              </svg>
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[7px] uppercase font-sans tracking-wider text-neutral-400">GET IT ON</span>
                <span className="text-xs font-semibold font-sans mt-0.5">Google Play</span>
              </div>
            </a>

            {/* App Store Button */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="bg-black text-white rounded-xl px-4 py-2 flex items-center gap-2.5 border border-neutral-800 hover:bg-neutral-900 transition-all shadow-md select-none hover:-translate-y-0.5 opacity-50 cursor-not-allowed"
              title="iOS App Store release coming soon"
            >
              <svg className="w-5 h-5 flex-shrink-0 text-[#007AFF]" viewBox="0 0 24 24" fill="currentColor">
                <rect width="24" height="24" rx="5" fill="#007AFF"/>
                <path d="M12.5 5.5h-1l-3.7 9.5h1.2l1-2.7h4l1 2.7h1.2L12.5 5.5zm-1.1 5.8l1.6-4.5 1.6 4.5h-3.2z" fill="white"/>
              </svg>
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[7px] font-sans tracking-wider text-neutral-400">Coming soon on</span>
                <span className="text-xs font-semibold font-sans mt-0.5">App Store</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Ticker: App Store Reviews */}
      <div className="w-full relative flex justify-start md:justify-end overflow-x-auto md:overflow-hidden py-2 md:py-0 mt-4 md:mt-0 select-none pointer-events-auto md:pointer-events-none scrollbar-none">
        <div
          ref={bottomRowRef}
          className="flex gap-4 md:gap-6 items-center px-4 md:px-0"
        >
          {APP_STORE_REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2rem] p-6 w-[300px] md:w-[340px] h-[185px] md:h-[190px] shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-black/[0.04] flex-shrink-0 flex flex-col justify-between transition-all duration-300"
            >
              <p className="font-body text-xs md:text-sm text-[#1A1A1A] leading-relaxed font-normal">
                &ldquo;{rev.text}&rdquo;
              </p>
              <div>
                <div className="w-full h-[1px] bg-black/[0.06] mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-body text-sm font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                      {rev.author}
                      <span className="inline-flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#1DA1F2] text-white flex-shrink-0">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </span>
                    <span className="font-body text-[10px] text-[#8A8A8A] mt-0.5">{rev.date}</span>
                  </div>
                  <div className="bg-white border border-black/[0.06] rounded-xl px-2.5 py-1.5 flex flex-col items-center justify-center w-[72px] h-[72px] shadow-sm flex-shrink-0">
                    <div className="relative w-6 h-6">
                      <Image
                        src={prefixPath('/images/store-icons/app_store.png')}
                        alt="App Store Logo"
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                    <span className="font-body text-[9px] font-bold text-[#8A8A8A] mt-1.5 tracking-tight">AppStore</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
