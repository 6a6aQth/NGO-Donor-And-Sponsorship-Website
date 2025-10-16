import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function DonationCTA() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src="/children-studying-classroom-black-and-white.jpg"
              alt="Children in classroom"
              className="w-full h-[500px] object-cover rounded-lg grayscale"
            />
          </div>

          {/* Right side - Donation Form */}
          <Card className="p-8 bg-card border-border">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Donate Now!</h2>
            <form className="space-y-4">
              <Input type="text" placeholder="Your name*" className="bg-background" />
              <Input type="email" placeholder="Email address*" className="bg-background" />
              <Input type="text" placeholder="Donation amount $" className="bg-background" />
              <Input type="text" placeholder="Your message" className="bg-background" />
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">Donate Now</Button>
              <p className="text-xs text-center text-muted-foreground">Secured by Stripe Payment</p>
            </form>

            <div className="mt-8 p-6 bg-[oklch(0.25_0.01_240)] text-white rounded-lg">
              <h3 className="font-semibold mb-3">Embark on this Life-Changing Journey with Us</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Embark on a transformational voyage with us, where every step leads to profound personal growth and
                meaningful connections. Join our community of changemakers and experience the joy of making a real
                difference in children's lives.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
