import Image from "next/image"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    date: "July 14, 2025",
    title: "The Impact of Your Donations: Real Stories from Orphaned Children",
    image: "/young-african-child-sitting-against-orange-wall.jpg",
  },
  {
    id: 2,
    date: "June 28, 2025",
    title: "How Education Empowers Orphaned Children for a Brighter Future",
    image: "/group-of-children-sitting-together-outdoors.jpg",
  },
  {
    id: 3,
    date: "June 15, 2025",
    title: "Providing Healthcare to Orphaned Children: Why It Matters",
    image: "/healthcare-worker-with-child-in-colorful-clothing.jpg",
  },
]

export function BlogSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <p className="text-teal font-semibold mb-3">Blogs</p>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4 text-balance">
                Stories, Insights, And Updates About Our Mission
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed">
                Narratives Unfolded: Discovering Stories, Gaining Insights, and Staying Updated on Our Ever-Evolving
                Mission.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-teal font-semibold hover:text-teal-dark transition-colors whitespace-nowrap"
            >
              View all →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <p className="text-teal text-sm font-semibold mb-2">{post.date}</p>
                <h3 className="text-charcoal font-semibold text-lg leading-snug group-hover:text-teal transition-colors">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
