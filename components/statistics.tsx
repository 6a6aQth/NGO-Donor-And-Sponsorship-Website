export function Statistics() {
  const stats = [
    { number: "1,000", label: "Engagement", color: "text-[oklch(0.85_0.15_95)]" },
    { number: "240", label: "Volunteers", color: "text-[oklch(0.62_0.12_200)]" },
    { number: "$33M", label: "Amount Raised", color: "text-[oklch(0.70_0.12_150)]" },
    { number: "123", label: "Country Impacted", color: "text-[oklch(0.65_0.18_25)]" },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-5xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
