import ColdOpen    from '@/components/scenes/ColdOpen'
import Experience  from '@/components/scenes/Experience'
import Stakes      from '@/components/scenes/Stakes'
import Engineer    from '@/components/scenes/Engineer'
import ProjectIPO  from '@/components/scenes/ProjectIPO'
import ProjectLicense from '@/components/scenes/ProjectLicense'
import ProjectQuizzle from '@/components/scenes/ProjectQuizzle'
import Timeline    from '@/components/scenes/Timeline'
import Invitation  from '@/components/scenes/Invitation'
import Navbar      from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 pointer-events-none select-none flex-col items-center gap-3">
        <span
          className="font-mono text-xs tracking-[0.4em] uppercase text-orange font-bold"
          style={{ writingMode: 'vertical-rl' }}
        >
          scroll
        </span>
        <div className="w-[2px] h-14 bg-gradient-to-b from-orange to-transparent" />
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" className="text-orange">
          <path d="M1 1L9 11L17 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <ColdOpen />
      <Experience />
      <Stakes />
      <Engineer />
      <ProjectIPO />
      <ProjectLicense />
      <ProjectQuizzle />
      <Timeline />
      <Invitation />
    </main>
  )
}
