import Link from "next/link"
import { Mail, ExternalLink, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[oklch(0.25_0.01_240)] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div>
            <h3 className="text-2xl font-bold">CareNest</h3>
          </div>

          <nav className="flex gap-8">
            <Link href="#about" className="text-sm hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="#causes" className="text-sm hover:text-primary transition-colors">
              Our Causes
            </Link>
            <Link href="#team" className="text-sm hover:text-primary transition-colors">
              Team
            </Link>
            <Link href="#blog" className="text-sm hover:text-primary transition-colors">
              Blog
            </Link>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              <ExternalLink className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-sm text-white/60">2024 Care Nest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
