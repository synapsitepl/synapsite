import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClientProviders } from '@/components/client-providers'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Tworzenie stron internetowych, chatboty i voiceboty AI | Synapsite',
  description: 'Projektuję nowoczesne strony internetowe oraz wdrażam chatboty i voiceboty AI dla firm. Zwiększ liczbę zapytań, zautomatyzuj obsługę klientów i rozwijaj biznes online.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body className="font-sans antialiased">
        {children}
        <ClientProviders />
        <Analytics />
      </body>
    </html>
  )
}
