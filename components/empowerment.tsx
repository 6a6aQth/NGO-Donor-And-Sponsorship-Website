export function Empowerment() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Empowering Bright Futures</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            In our quest for a better and more just world, the We Are Humanity Foundation is dedicated to compassion and
            positive change.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Top Left - Image with overlay quote */}
          <div className="relative overflow-hidden rounded-lg h-[300px]">
            <img
              src="/children-eating-together-smiling.jpg"
              alt="Children learning together"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[oklch(0.25_0.01_240)] p-6">
              <p className="text-sm leading-relaxed mb-3 text-white/90">
                "In the tapestry of life, every thread of charity adds beauty and strength. Together, we weave a
                brighter tomorrow."
              </p>
              <p className="text-xs text-white/70">By: Mahatma Gandhi</p>
            </div>
          </div>

          {/* Top Right - Split card with quote and image */}
          <div className="grid grid-cols-2 gap-0 rounded-lg overflow-hidden h-[300px]">
            <div className="bg-[oklch(0.25_0.01_240)] p-6 flex flex-col justify-center">
              <p className="text-sm leading-relaxed mb-4 text-white/90">
                "The smallest act of kindness is worth more than the grandest intention. Let your actions speak volumes
                for need."
              </p>
              <p className="text-xs text-white/70">By: Oscar Wilde</p>
            </div>
            <img src="/child-studying-with-books.jpg" alt="Child with books" className="w-full h-full object-cover" />
          </div>

          {/* Bottom Left - Split card with image and quote */}
          <div className="grid grid-rows-2 gap-0 rounded-lg overflow-hidden h-[300px]">
            <img
              src="/children-playing-colorful-toys.jpg"
              alt="Children playing"
              className="w-full h-full object-cover"
            />
            <div className="bg-[oklch(0.25_0.01_240)] p-6 flex flex-col justify-center">
              <p className="text-sm leading-relaxed mb-3 text-white/90">
                "Volunteering with Care Next has been a life-changing experience. Seeing the smiles on children's faces
                makes every effort worthwhile."
              </p>
              <p className="text-xs text-white/70">By: Sarah Johnson</p>
            </div>
          </div>

          {/* Bottom Right - Image with overlay quote */}
          <div className="relative overflow-hidden rounded-lg h-[300px]">
            <img src="/child-studying-with-books.jpg" alt="Child learning" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-[oklch(0.25_0.01_240)] p-6">
              <p className="text-sm leading-relaxed mb-3 text-white/90">
                "Charity is the pure love of the heart, the selfless expression of empathy that binds us all as one
                human family."
              </p>
              <p className="text-xs text-white/70">By: Mother Teresa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
