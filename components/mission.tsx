import { Button } from "@/components/ui/button"

export function Mission() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-bold mb-6 text-foreground text-balance text-5xl">
              Help Us Create Brighter Futures Through Education & Scholarships.
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground leading-relaxed mb-6 text-xl">
              Every student deserves access to quality education. Many face financial barriers that prevent them from pursuing their academic dreams. Support our mission to provide scholarships, educational resources, and mentorship opportunities that create lasting change in students' lives.
            </p>
            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white">Get Involved Now</Button>
              <Button variant="outline">Read About Us</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
