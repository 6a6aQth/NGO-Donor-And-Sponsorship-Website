import { Button } from "@/components/ui/button"

export function Mission() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-bold mb-6 text-foreground text-balance text-5xl">
              Help Us Create Brighter Futures for Orphaned Children.
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground leading-relaxed mb-6 text-xl">
              Every child deserves a chance to thrive. Many face challenges like lack of education, inadequate medical
              care, and lack of basic necessities. Support our mission to provide these opportunities and create lasting
              change.
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
