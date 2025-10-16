import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PaymentForm } from "@/components/payment-form"

export function DonationForm() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src="/volunteer-helping-community-black-and-white.jpg"
              alt="Volunteer helping in community"
              className="w-full h-[400px] object-cover rounded-lg grayscale shadow-lg"
            />
          </div>

          {/* Right side - Donation Form */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-foreground">Donate Now!</h2>
            <form className="space-y-4">
              <Input type="text" placeholder="Your name *" className="bg-background border-border/50 h-12" />
              <Input type="email" placeholder="Email *" className="bg-background border-border/50 h-12" />
              <Input type="text" placeholder="Donation amount *" className="bg-background border-border/50 h-12" />
              <Textarea
                placeholder="Your message*"
                className="bg-background border-border/50 min-h-[100px] resize-none"
              />
              <PaymentForm>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-medium">
                  Donate
                </Button>
              </PaymentForm>
              <p className="text-sm text-center text-muted-foreground">
                Been here before? <span className="text-foreground font-medium">Continue supporting students</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
