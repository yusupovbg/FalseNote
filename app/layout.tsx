import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopLoader from '@/components/providers/top-loader'
import Navbar from '@/components/navbar/navbar'
import { ScrollArea } from '@/components/ui/scroll-area'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FalseNotes',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TopLoader />
            <div className="block">
              <Navbar />
            </div>
            <ScrollArea className='min-h-screen w-screen xl:px-36 2xl:px-64'>
              {children}
            </ScrollArea>
        </ThemeProvider>
      </body>
    </html>
  )
}
