import { Button } from "@/components/ui/button"
import { ScholarshipForm } from "@/components/scholarship-form"

export function VolunteerCTA() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[oklch(0.25_0.01_240)] rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            {/* Left side - Text content */}
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4 leading-tight">Apply for Scholarships & Sponsorships</h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Embark on your educational journey with us, where every application holds the promise of academic opportunity. We help students find and apply for external scholarships, and provide direct sponsorships for educational support. Join thousands of students who have received guidance and funding, fostering academic excellence and achieving their dreams.
              </p>
              <ScholarshipForm>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                >
                  Apply Now
                </Button>
              </ScholarshipForm>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <img
                src="/diverse-group-circle-smiling-faces.jpg"
                alt="Students celebrating academic success"
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
