// content.ts
export const basePath = '/portfolio'

export const prefixPath = (src: string) => {
  if (!src) return src
  if (src.startsWith('http') || src.startsWith('mailto:') || src.startsWith('data:')) return src
  if (src.startsWith(basePath)) return src
  return `${basePath}${src.startsWith('/') ? '' : '/'}${src}`
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Project {
  chapter: string
  title: string
  tagline: string
  description: string
  stack: string[]
  status: 'shipped' | 'in progress'
  link: string | null
  github: string | null
  website: string | null
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  location: string
  type: 'work' | 'education'
  headline: string
  impact: string
  impactLabel: string
}

export interface TimelineItem {
  year: string
  label: string
  sublabel: string
  type: 'work' | 'education'
}

export interface Content {
  hero: { name: string; title: string; tagline: string }
  stakes: { statement: string; stats: Stat[] }
  about: { photo: string; bio: string; tags: string[] }
  experience: ExperienceItem[]
  projects: Project[]
  timeline: TimelineItem[]
  contact: { email: string; github: string; linkedin: string; domain: string; twitter?: string }
}

export const content: Content = {
  hero: {
    name: 'Hari Joshi',
    title: 'Mobile Engineer · KMP Developer',
    tagline: 'I build location-aware Android and Kotlin Multiplatform mobile products.',
  },

  stakes: {
    statement:
      'Building fluid Compose UI, offline-first architectures, MapLibre integrations, and shared mobile libraries — different platforms, same high bar: make it fast and make it feel native.',
    stats: [
      { value: 2, suffix: '+', label: 'Years of engineering' },
      { value: 3, suffix: '', label: 'Production & OSS apps' },
      { value: 99.9, suffix: '%', label: 'Crash-free rating' },
    ],
  },

  about: {
    photo: prefixPath('/images/favicons.jpeg'),
    bio: "I am a mobile engineer based in Kathmandu, Nepal, specializing in building premium Android apps and Kotlin Multiplatform (KMP) shared codebases. My expertise spans MapLibre SDK location services, offline-first architectures with Room DB, Stripe payments integration, and high-fidelity declarative layouts in Jetpack Compose. I am passionate about release polish, clean code architecture, and optimization for performance and reliability in real-world user flows.",
    tags: ['Kotlin', 'KMP', 'Compose', 'Firebase', 'MapLibre SDK', 'Room DB', 'Ktor', 'Stripe SDK', 'Coroutines', 'MVVM', 'Gradle'],
  },

  experience: [
    {
      role: 'Mobile Engineer',
      company: 'Kathmandu Living Labs',
      period: 'Apr 2025 – Apr 2026',
      location: 'Kathmandu, Nepal',
      type: 'work',
      headline: 'Engineered complex location-aware services and mapping workflows for Baato Maps. Integrated MapLibre SDK, built custom real-time navigation overlays, and resolved threading leaks in map views, improving production app stability.',
      impact: '99.9',
      impactLabel: '% crash-free sessions',
    },
    {
      role: 'Android Developer Intern',
      company: "Uncle Sam's Technologies",
      period: 'Aug 2024 – Sep 2024',
      location: 'Remote',
      type: 'work',
      headline: 'Integrated secure Stripe SDK payment systems and web checkouts in the Billings Android client. Managed asynchronous transactions with Coroutines and built robust local persistence for billing states.',
      impact: '100',
      impactLabel: '% secure transaction flows',
    },
  ],

  projects: [
    {
      chapter: '01',
      title: 'IPO Share',
      tagline: 'Track your IPO allocations and discover opportunities.',
      description:
        'A mobile IPO tracking experience with dashboard, issue discovery, result checking, account management, and portfolio views.',
      stack: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'MVVM', 'SQLite', 'Retrofit'],
      status: 'shipped',
      link: null,
      github: 'https://github.com/harijoshi07',
      website: null,
    },
    {
      chapter: '02',
      title: 'Driving License Exam Nepal',
      tagline: 'Preparation helper for driving license tests.',
      description:
        'An offline-first Android application for driving license exam preparation in Nepal, built with Kotlin, Jetpack Compose, and Material 3 for a clean exam and study experience.',
      stack: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room DB', 'Coroutines', 'Offline First'],
      status: 'shipped',
      link: 'https://play.google.com/store/apps/details?id=com.hari.drivinglicenseexamnepal_',
      github: 'https://github.com/harijoshi07/Driving-License-Exam-App',
      website: 'https://play.google.com/store/apps/details?id=com.hari.drivinglicenseexamnepal_',
    },
    {
      chapter: '03',
      title: 'Quizzle',
      tagline: 'Offline-first trivia game powered by Room.',
      description:
        'A quiz app with offline progress tracking, local Room persistence, API-based question fetching, coroutine-backed async work, and a clean Material 3 interface.',
      stack: ['Kotlin', 'Room DB', 'Retrofit', 'Koin DI', 'Coroutines', 'Material 3'],
      status: 'shipped',
      link: null,
      github: 'https://github.com/harijoshi07/Quizzle',
      website: null,
    },
  ],

  timeline: [
    { year: '2023', label: 'Self-Start & Open Source', sublabel: 'Began publishing Kotlin libraries, Android utilities, and open source projects on GitHub.', type: 'work' },
    { year: '2024', label: "Uncle Sam's Technologies", sublabel: "Android Developer Intern · Designed payment pipelines using Stripe SDK and reactive networking with Ktor & Coroutines.", type: 'work' },
    { year: '2025', label: 'Kathmandu Living Labs', sublabel: 'Mobile Engineer · Scaled mapping SDK integrations (MapLibre), real-time navigation layouts, and offline sync.', type: 'work' },
  ],

  contact: {
    email: 'harijoshi07x@gmail.com',
    github: 'https://github.com/harijoshi07',
    linkedin: 'https://linkedin.com/in/harijoshi07',
    domain: 'harijoshi07.github.io/portfolio',
    twitter: 'https://x.com/sometimesIcode_',
  },
}
