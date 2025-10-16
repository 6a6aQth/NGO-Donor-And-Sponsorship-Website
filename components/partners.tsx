export function Partners() {
  const partners = [
    { name: "Save the Children", logo: "/save-the-children-logo.jpg" },
    { name: "UNICEF", logo: "/unicef-logo.png" },
    { name: "Red Cross", logo: "/red-cross-logo.jpg" },
    { name: "Amazon", logo: "/amazon-logo.png" },
    { name: "Work", logo: "/work-logo.jpg" },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm mb-6">Over 200+ partner currently trust us</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {partners.map((partner) => (
            <div key={partner.name} className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="h-12 w-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
