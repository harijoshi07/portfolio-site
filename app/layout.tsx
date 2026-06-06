import type { Metadata } from 'next'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/jetbrains-mono/400.css'
import './globals.css'
import LenisProvider from '@/components/ui/LenisProvider'
import Cursor from '@/components/ui/Cursor'
import RotatingBackground from '@/components/ui/RotatingBackground'

export const metadata: Metadata = {
  title: 'Hari Joshi — Mobile Engineer & KMP Developer',
  description:
    'Portfolio of Hari Joshi — mobile engineer specializing in Android, Kotlin Multiplatform, MapLibre SDK, and offline-first mobile products.',
  openGraph: {
    title: 'Hari Joshi — Mobile Engineer & KMP Developer',
    description: 'I build location-aware Android and Kotlin Multiplatform mobile products.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <RotatingBackground />
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
