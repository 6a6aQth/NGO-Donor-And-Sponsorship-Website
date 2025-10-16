import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PaymentForm } from "@/components/payment-form"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.25_0.01_240)] text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Chiyembekezo Scholar Foundation Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold">Chiyembekezo Scholar Foundation</span>
            </Link>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#programs" className="text-sm hover:text-primary transition-colors">
              Scholarships
            </Link>
            <Link href="#about" className="text-sm hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="#stories" className="text-sm hover:text-primary transition-colors">
              Success Stories
            </Link>
            <Link href="#blog" className="text-sm hover:text-primary transition-colors">
              Blog
            </Link>
          </nav>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-4">
            <PaymentForm>
              <Button variant="default" className="bg-primary hover:bg-primary/90 text-white">
                Donate
              </Button>
            </PaymentForm>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
