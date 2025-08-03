import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'
import { Toaster } from "@/components/ui/sonner";
import Navbar from '@/components/frontPage/Navbar'
import Footer from '@/components/dashboard/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Subject Spot',
  description: 'Find Your Dream Space, Right Here in Cameroon',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <div>
            <Navbar />
              {children}
            <Footer />
          </div>
        </body>
      </html>
    </SessionProvider>
  )
}
