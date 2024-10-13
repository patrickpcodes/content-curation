'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import useDarkMode from '@/hooks/useDarkMode'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isDarkMode } = useDarkMode();

  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-black dark:text-white`}>
        {children}
      </body>
    </html>
  )
}
