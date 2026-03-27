import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClientProviders } from '@/components/client-providers'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

const title = 'Tworzenie stron internetowych, chatboty i voiceboty AI | Synapsite'
const description =
  'Projektuję nowoczesne strony internetowe oraz wdrażam chatboty i voiceboty AI dla firm. Zwiększ liczbę zapytań, zautomatyzuj obsługę klientów i rozwijaj biznes online.'

export const metadata: Metadata = {
  metadataBase: new URL('https://synapsite.pl'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://synapsite.pl',
    siteName: 'Synapsite',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 2048,
        height: 2048,
        alt: 'Logo Synapsite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/logo.png'],
  },
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
