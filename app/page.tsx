import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CauseCategories } from "@/components/cause-categories"
import { Mission } from "@/components/mission"
import { Statistics } from "@/components/statistics"
import { Empowerment } from "@/components/empowerment"
import { BlogSection } from "@/components/blog-section"
import { Partners } from "@/components/partners"
import { Stories } from "@/components/stories"
import { DonationForm } from "@/components/donation-form"
import { VolunteerCTA } from "@/components/volunteer-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CauseCategories />
      <Mission />
      <Statistics />
      <Empowerment />
      <BlogSection />
      <Partners />
      <Stories />
      <DonationForm />
      <VolunteerCTA />
      <Footer />
    </main>
  )
}
