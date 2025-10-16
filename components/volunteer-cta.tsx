import { Button } from "@/components/ui/button"

export function VolunteerCTA() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[oklch(0.25_0.01_240)] rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            {/* Left side - Text content */}
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4 leading-tight">Embark on this Life-Changing Journey with Us</h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Embark on a transformational voyage with us, where every step holds the promise of positive change. Join
                hands as we navigate this life-changing journey together, fostering compassion and making a lasting
                impact in the collective spirit of progress. Your presence is not just welcomed.
              </p>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                Become a volunteer
              </Button>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <img
                src="/diverse-group-circle-smiling-faces.jpg"
                alt="Diverse group of smiling volunteers"
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
