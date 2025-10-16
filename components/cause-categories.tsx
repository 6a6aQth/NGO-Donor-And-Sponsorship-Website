"use client"

import { BookOpen, GraduationCap, Users, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { cn } from "@/lib/utils"

const causes = [
  {
    icon: BookOpen,
    title: "Academic Support",
    color: "bg-[oklch(0.85_0.15_95)]",
    iconColor: "text-[oklch(0.65_0.18_85)]",
    image: "/children-studying-classroom-black-and-white.jpg",
  },
  {
    icon: GraduationCap,
    title: "Scholarships",
    color: "bg-[oklch(0.62_0.12_200)]",
    iconColor: "text-white",
    image: "/child-studying-with-books.jpg",
  },
  {
    icon: Users,
    title: "Mentorship",
    color: "bg-[oklch(0.70_0.12_150)]",
    iconColor: "text-white",
    image: "/group-of-children-sitting-together-outdoors.jpg",
  },
  {
    icon: Award,
    title: "Achievement",
    color: "bg-[oklch(0.65_0.18_25)]",
    iconColor: "text-white",
    image: "/children-eating-together-smiling.jpg",
  },
]

export function CauseCategories() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-20">
          {causes.map((cause, index) => (
            <div
              key={cause.title}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "rounded-lg relative overflow-hidden h-60 w-full transition-all duration-300 ease-out cursor-pointer",
                hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
              )}
            >
              {/* Background Image */}
              <img
                src={cause.image}
                alt={cause.title}
                className="object-cover absolute inset-0 w-full h-full"
              />
              
              {/* Default State - Icon and Title */}
              <div
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-300",
                  hovered === index ? "opacity-0" : "opacity-100"
                )}
              >
                <div className={`${cause.color} rounded-full p-4 mb-4`}>
                  <cause.icon className={`w-8 h-8 ${cause.iconColor}`} />
                </div>
                <h3 className={`text-lg font-semibold text-white text-center ${cause.iconColor}`}>
                  {cause.title}
                </h3>
              </div>

              {/* Hover State - Title Overlay */}
              <div
                className={cn(
                  "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
                  hovered === index ? "opacity-100" : "opacity-0"
                )}
              >
                <div className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                  {cause.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
