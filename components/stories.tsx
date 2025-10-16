import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Stories() {
  const testimonials = [
    {
      text: "I've seen firsthand the impact of giving change for the knowing this. My contribution is helping to educate and empower a child is truly rewarding.",
      author: "Emily Chen",
      role: "Monthly Donor",
      avatar: "/woman-portrait.png",
    },
    {
      text: "Volunteering at Care Nest has been a game-changer for me. Knowing that my contribution is helping to educate and empower children is incredibly fulfilling.",
      author: "David Kim",
      role: "Volunteer",
      avatar: "/thoughtful-man-portrait.png",
    },
    {
      text: "I'm a former orphan myself. I received help from Care Nest when I was a teenager and it changed my life. Now I'm able to give back.",
      author: "Sarah Wilson",
      role: "Former Beneficiary",
      avatar: "/diverse-woman-smiling.png",
    },
    {
      text: "Care Nest's transparency and dedication to being great advocates. I've been a donor for 5 years and I can see the difference my contributions make.",
      author: "Maria Garcia",
      role: "Long-term Supporter",
      avatar: "/professional-woman.png",
    },
    {
      text: "Volunteering with Care Nest has been a life-changing experience. I've seen firsthand how donations translate into real opportunities for children.",
      author: "James Martin",
      role: "Volunteer Coordinator",
      avatar: "/smiling-man.png",
    },
    {
      text: "I love working with Care Nest because they make it so easy to make a difference. Every dollar goes directly to helping children in need.",
      author: "Lisa Anderson",
      role: "Corporate Partner",
      avatar: "/business-woman.png",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Stories from Our Community</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm text-foreground">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
