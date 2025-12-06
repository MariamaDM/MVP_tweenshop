import './globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tweenshop',
  description: 'MVP Tweenshop',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-6">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
