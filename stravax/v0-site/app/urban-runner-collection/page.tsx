import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UrbanRunnerCollection() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <div className="size-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600" />
            <span className="text-xl font-bold">Portfolio</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link className="text-sm font-medium hover:text-orange-600" href="/">
              Home
            </Link>
            <Link className="text-sm font-medium hover:text-orange-600" href="/eco-conscious-series">
              Eco-Conscious Series
            </Link>
            <Link className="text-sm font-medium hover:text-orange-600" href="/#contact">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Project Hero */}
      <section className="relative">
        <div className="container mx-auto max-w-7xl px-4 py-24 sm:py-32">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                Urban Runner Collection
                <span className="text-orange-600">.</span>
              </h1>
              <p className="text-gray-500 text-lg md:text-xl">
                A modern take on classic running silhouettes, designed for both performance and style.
              </p>
              <div className="flex gap-2">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
                  Athletic
                </span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
                  Innovation
                </span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=450&width=600"
                alt="Urban Runner Collection"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Project Overview */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-3xl font-bold">Project Overview</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <p className="text-gray-500 text-lg">
              The Urban Runner Collection combines the latest in athletic technology with street-ready style. 
              Each shoe in this collection is designed to provide maximum comfort and support for runners, 
              while also serving as a fashionable option for everyday wear.
            </p>
            <p className="text-gray-500 text-lg">
              Our team of designers and engineers worked tirelessly to create a line of footwear that not only 
              performs exceptionally well during intense workouts but also seamlessly transitions into casual, 
              everyday scenarios. The result is a versatile collection that caters to the modern, active lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-3xl font-bold">Key Features</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md h-full">
                <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-3xl font-bold">Design Process</h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-gray-500 text-lg">
                Our design process began with extensive research into the needs of urban runners. We conducted 
                surveys, analyzed running patterns, and studied the latest advancements in footwear technology.
              </p>
              <p className="text-gray-500 text-lg">
                From there, our team of designers created numerous prototypes, each one refining the balance 
                between performance and style. We tested these prototypes with professional athletes and 
                everyday runners to gather real-world feedback.
              </p>
              <p className="text-gray-500 text-lg">
                The iterative process allowed us to fine-tune every aspect of the shoe, from the sole 
                construction to the upper materials, ensuring that each element contributes to both 
                the performance and aesthetic appeal of the final product.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=Design+Process+${item}`}
                    alt={`Design Process ${item}`}
                    width={300}
                    height={300}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Materials Showcase */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-3xl font-bold">Materials Showcase</h2>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Materials+Showcase"
                alt="Materials Showcase"
                width={800}
                height={600}
                className="rounded-lg object-cover shadow-md"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Cutting-edge Materials</h3>
              <p className="text-gray-500 text-lg">
                We've sourced the most advanced materials to ensure our Urban Runner Collection delivers 
                unparalleled performance and comfort. From breathable mesh uppers to responsive cushioning 
                systems, every component is carefully selected and tested.
              </p>
              <ul className="list-inside list-disc space-y-2 text-gray-500 text-lg">
                <li>Lightweight, breathable mesh</li>
                <li>High-rebound foam midsoles</li>
                <li>Durable rubber outsoles</li>
                <li>Moisture-wicking linings</li>
                <li>Recycled polyester laces</li>
                <li>Bio-based TPU reinforcements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Color Variants */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-3xl font-bold">Color Variants</h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {['Midnight Black', 'Urban Gray', 'Neon Pulse', 'Arctic Blue', 'Sunset Orange', 'Forest Green'].map((color, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=${color}`}
                  alt={color}
                  width={300}
                  height={300}
                  className="object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{color}</h3>
                  <p className="text-sm text-gray-500">Limited Edition</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-3xl font-bold">Performance Metrics</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="rounded-lg bg-white p-6 text-center shadow-sm h-full">
                <h3 className="mb-2 text-xl font-semibold">{metric.title}</h3>
                <p className="text-3xl font-bold text-orange-600">{metric.value}</p>
                <p className="mt-2 text-sm text-gray-500">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-3xl font-bold">What Our Customers Say</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md h-full">
                <p className="mb-6 italic text-gray-500">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={`/placeholder.svg?height=50&width=50&text=${testimonial.name.charAt(0)}`}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Efforts */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-3xl font-bold">Our Sustainability Efforts</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                At Urban Runner, we're committed to reducing our environmental impact. Our sustainability 
                efforts are woven into every aspect of our design and production process.
              </p>
              <ul className="list-inside list-disc space-y-2 text-gray-700 text-lg">
                <li>Use of recycled materials in shoe uppers</li>
                <li>Water-based adhesives to reduce chemical usage</li>
                <li>Energy-efficient manufacturing processes</li>
                <li>Eco-friendly packaging made from recycled materials</li>
                <li>Carbon offset program for shipping</li>
              </ul>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Sustainability+Efforts"
                alt="Sustainability Efforts"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-600 py-24 text-white">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold">Ready to Experience Urban Runner?</h2>
          <p className="mb-10 text-xl">Join the revolution in urban footwear technology.</p>
          <Button className="bg-white text-orange-600 hover:bg-gray-100 text-lg py-6 px-10">
            Shop the Collection
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">About Us</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="#">Our Story</Link></li>
                <li><Link href="#">Team</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Products</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="#">Urban Runner Collection</Link></li>
                <li><Link href="#">Eco-Conscious Series</Link></li>
                <li><Link href="#">Limited Editions</Link></li>
                <li><Link href="#">Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="#">FAQs</Link></li>
                <li><Link href="#">Shipping & Returns</Link></li>
                <li><Link href="#">Size Guide</Link></li>
                <li><Link href="#">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="#">Instagram</Link></li>
                <li><Link href="#">Twitter</Link></li>
                <li><Link href="#">Facebook</Link></li>
                <li><Link href="#">YouTube</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center">
            <p className="text-sm text-gray-500"> 2024 Urban Runner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Lightweight Design",
    description: "Engineered to be incredibly light, reducing fatigue during long runs or everyday wear."
  },
  {
    title: "Advanced Cushioning",
    description: "Our proprietary foam technology provides superior comfort and energy return with every step."
  },
  {
    title: "Breathable Upper",
    description: "Mesh upper ensures excellent ventilation, keeping your feet cool and dry."
  },
  {
    title: "Durable Outsole",
    description: "High-traction rubber outsole designed for both urban environments and light trails."
  },
  {
    title: "Adaptive Fit",
    description: "Dynamic lacing system adapts to your foot shape for a personalized, secure fit."
  },
  {
    title: "Reflective Elements",
    description: "Strategic reflective details enhance visibility during low-light conditions."
  }
]

const testimonials = [
  {
    quote: "The Urban Runner shoes have completely transformed my daily jogs. They're incredibly comfortable and stylish!",
    name: "Sarah Johnson",
    title: "Avid Runner"
  },
  {
    quote: "As a fitness instructor, I need shoes that can keep up with my active lifestyle. Urban Runner delivers on all fronts.",
    name: "Mike Chen",
    title: "Fitness Trainer"
  },
  {
    quote: "I've never had a pair of running shoes that look this good while performing so well. Highly recommended!",
    name: "Emily Rodriguez",
    title: "Marathon Enthusiast"
  }
]

const performanceMetrics = [
  {
    title: "Weight Reduction",
    value: "20%",
    description: "Lighter than previous models"
  },
  {
    title: "Energy Return",
    value: "30%",
    description: "Improved bounce-back"
  },
  {
    title: "Durability",
    value: "500 miles",
    description: "Average lifespan"
  },
  {
    title: "Breathability",
    value: "95%",
    description: "Airflow rating"
  }
]
