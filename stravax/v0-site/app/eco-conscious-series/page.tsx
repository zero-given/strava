import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EcoConsciousSeries() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <div className="size-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600" />
            <span className="text-xl font-bold">Portfolio</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link className="text-sm font-medium hover:text-orange-600" href="/#work">
              Work
            </Link>
            <Link className="text-sm font-medium hover:text-orange-600" href="/#about">
              About
            </Link>
            <Link className="text-sm font-medium hover:text-orange-600" href="/#contact">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Project Hero */}
      <section className="container py-24 sm:py-32">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              Eco-Conscious Series
              <span className="text-orange-600">.</span>
            </h1>
            <p className="text-gray-500 md:text-xl">
              Sustainable footwear crafted from recycled materials without compromising on design.
            </p>
            <div className="flex gap-2">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
                Sustainable
              </span>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
                Lifestyle
              </span>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=450&width=600"
              alt="Eco-Conscious Series"
              width={600}
              height={450}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="container py-12 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Project Overview</h2>
            <p className="text-gray-500">
              The Eco-Conscious Series represents our commitment to sustainable fashion. 
              Each pair in this collection is crafted using recycled and eco-friendly materials, 
              proving that style and sustainability can go hand in hand.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Key Features</h2>
            <ul className="list-inside list-disc space-y-2 text-gray-500">
              <li>Made from recycled ocean plastics</li>
              <li>Natural, biodegradable rubber soles</li>
              <li>Organic cotton laces and linings</li>
              <li>Water-based adhesives</li>
              <li>Minimal packaging using recycled materials</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container py-12 md:py-24">
        <h2 className="mb-8 text-2xl font-bold">Gallery</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={`/placeholder.svg?height=300&width=400&text=Gallery+Image+${item}`}
                alt={`Gallery Image ${item}`}
                width={400}
                height={300}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container flex h-16 items-center justify-between">
          <p className="text-sm text-gray-500">© 2024. All rights reserved.</p>
          <div className="flex gap-6">
            <Link className="text-sm text-gray-500 hover:text-orange-600" href="#">
              Twitter
            </Link>
            <Link className="text-sm text-gray-500 hover:text-orange-600" href="#">
              Instagram
            </Link>
            <Link className="text-sm text-gray-500 hover:text-orange-600" href="#">
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

