import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.25_0.01_240)] text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            CareNest
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="#causes" className="text-sm hover:text-primary transition-colors">
              Our Causes
            </Link>
            <Link href="#news" className="text-sm hover:text-primary transition-colors">
              News
            </Link>
            <Link href="#blog" className="text-sm hover:text-primary transition-colors">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-white">
              Donate
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
