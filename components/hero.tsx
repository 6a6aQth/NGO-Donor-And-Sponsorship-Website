import { Button } from "@/components/ui/button"
import { PaymentForm } from "@/components/payment-form"

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-[oklch(0.25_0.01_240)] text-white pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/children-studying-classroom-black-and-white.jpg"
          alt="Students studying"
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.25_0.01_240)]/80 to-[oklch(0.25_0.01_240)]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Empowering Students Through
          <br />
          Education & Scholarships
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Join us in creating brighter futures through quality education, scholarships, and academic support for deserving students
        </p>
        <PaymentForm>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
            Support Education Now
          </Button>
        </PaymentForm>
      </div>
    </section>
  )
}
