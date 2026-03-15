import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClientProviders } from '@/components/client-providers'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Synapsite | Strony WWW, Chatboty i Voiceboty AI',
  description: 'Synapsite - budujemy nowoczesne strony internetowe oraz wdrażamy chatboty i voiceboty AI dla firm. Automatyzacja obsługi klienta 24/7.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
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
