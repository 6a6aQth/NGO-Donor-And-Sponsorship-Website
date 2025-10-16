import { Utensils, Droplet, GraduationCap, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"

const causes = [
  {
    icon: Utensils,
    title: "Healthy Food",
    color: "bg-[oklch(0.85_0.15_95)]",
    iconColor: "text-[oklch(0.65_0.18_85)]",
  },
  {
    icon: Droplet,
    title: "Clean Water",
    color: "bg-[oklch(0.62_0.12_200)]",
    iconColor: "text-white",
  },
  {
    icon: GraduationCap,
    title: "Education",
    color: "bg-[oklch(0.70_0.12_150)]",
    iconColor: "text-white",
  },
  {
    icon: Heart,
    title: "Medical Care",
    color: "bg-[oklch(0.65_0.18_25)]",
    iconColor: "text-white",
  },
]

export function CauseCategories() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-20">
          {causes.map((cause) => (
            <Card
              key={cause.title}
              className={`${cause.color} border-0 p-8 text-center hover:scale-105 transition-transform cursor-pointer`}
            >
              <cause.icon className={`w-12 h-12 mx-auto mb-4 ${cause.iconColor}`} />
              <h3 className={`text-lg font-semibold ${cause.iconColor}`}>{cause.title}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
