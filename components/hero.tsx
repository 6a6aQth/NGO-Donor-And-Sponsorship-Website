import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-[oklch(0.25_0.01_240)] text-white pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/children-playing-together-black-and-white.jpg"
          alt="Children playing"
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.25_0.01_240)]/80 to-[oklch(0.25_0.01_240)]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Make a Difference for
          <br />
          Orphaned Children
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Join us in creating brighter futures through education, healthcare, and compassionate support
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
          Start Donating Now
        </Button>
      </div>
    </section>
  )
}
