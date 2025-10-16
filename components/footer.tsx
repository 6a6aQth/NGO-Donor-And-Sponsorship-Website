import Link from "next/link"
import Image from "next/image"
import { Mail, ExternalLink, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[oklch(0.25_0.01_240)] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Chiyembekezo Scholar Foundation Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h3 className="text-2xl font-bold">Chiyembekezo Scholar Foundation</h3>
          </div>

          <nav className="flex gap-8">
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

          <p className="text-sm text-white/60">2024 Chiyembekezo Scholar Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
