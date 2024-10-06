import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ReactNode } from 'react'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Gerador de Constelações | Crie Seu Próprio Céu Noturno',
  description: 'Crie e explore suas próprias constelações em um céu noturno interativo. Desenhe, salve e compartilhe padrões de estrelas únicos com nosso Gerador de Constelações fácil de usar.',
  keywords: ['constelação', 'mapa estelar', 'céu noturno', 'astronomia', 'interativo', 'gerador'],
  authors: [{ name: 'Edilando Saturnino', url: 'https://edilando.com.br' }],
  creator: 'Edilando Saturnino',
  publisher: 'Edilando Saturnino',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Gerador de Constelações | Crie Seu Próprio Céu Noturno',
    description: 'Desenhe e explore constelações únicas com nosso gerador de céu noturno interativo. Perfeito para entusiastas da astronomia e mentes criativas.',
    siteName: 'Gerador de Constelações',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <head>
        <link rel='canonical' href='https://url-do-seu-gerador-de-constelacoes.com' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <meta name='theme-color' content='#000000' />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
