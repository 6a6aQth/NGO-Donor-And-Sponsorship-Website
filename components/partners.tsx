import LogoLoop from "./LogoLoop"

export function Partners() {
  const partners = [
    { src: "/save-the-children-logo.jpg", alt: "Save the Children", href: "https://www.savethechildren.org" },
    { src: "/unicef-logo.png", alt: "UNICEF", href: "https://www.unicef.org" },
    { src: "/red-cross-logo.jpg", alt: "Red Cross", href: "https://www.redcross.org" },
    { src: "/amazon-logo.png", alt: "Amazon", href: "https://www.amazon.com" },
    { src: "/work-logo.jpg", alt: "Work", href: "https://www.work.com" },
    { src: "/Ganpat.png", alt: "Ganpat", href: "#" },
    { src: "/placeholder-logo.svg", alt: "Educational Partner 1", href: "#" },
    { src: "/placeholder-logo.svg", alt: "Educational Partner 2", href: "#" },
    { src: "/placeholder-logo.svg", alt: "Educational Partner 3", href: "#" },
    { src: "/placeholder-logo.svg", alt: "Educational Partner 4", href: "#" },
    { src: "/placeholder-logo.svg", alt: "Educational Partner 5", href: "#" },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-3xl mb-6">Over 200+ partners currently trust us</p>
        </div>
        <div className="h-20">
          <LogoLoop
            logos={partners}
            speed={80}
            direction="left"
            logoHeight={64}
            gap={48}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="oklch(0.95 0.02 85)"
            ariaLabel="Partner organizations"
          />
        </div>
      </div>
    </section>
  )
}
