import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FAANG Resume Sprint - 14 Day Application System',
  description: 'Transform your resume from ghosted applications to recruiter callbacks in 14 days',
  keywords: 'FAANG, resume, job application, ATS, software engineer, career',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
