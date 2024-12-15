'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

function HomePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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
            <Link className="text-sm font-medium hover:text-orange-600" href="#work">
              Work
            </Link>
            <Link className="text-sm font-medium hover:text-orange-600" href="#about">
              About
            </Link>
            <Link className="text-sm font-medium hover:text-orange-600" href="#contact">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="space-y-6 w-full max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-center">
                Will Makarainen
                <span className="text-orange-600">.</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 text-lg md:text-xl lg:text-2xl">
                3d/footwear designer
              </p>
              <div className="pt-8">
                {isClient && (
                  <Button
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    size="lg"
                    onClick={() => {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Projects
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-2xl font-bold tracking-tighter sm:text-3xl text-center">
            Featured Projects
            <span className="text-orange-600">.</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Link href={`/${project.slug}`} key={index} className="block">
                <div
                  className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      priority={index < 3}
                      style={{ 
                        transform: `translate(${project.horizontalOffset || 0}px, ${project.verticalOffset || 0}px) scale(${project.zoom ? project.zoom / 100 : 1})`,
                        transformOrigin: 'center center'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      {project.year && <span className="text-sm font-bold">({project.year})</span>}
                    </div>
                    <p className="text-sm text-gray-500">{project.description}</p>
                    <div className="mt-4 flex gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Concepting */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter text-center">
            3D Concepting
            <span className="text-orange-600">.</span>
          </h2>
          <p className="mb-12 text-xl text-gray-600 text-center">Bringing ideas to life through digital innovation</p>
          <ExpandableImageSection
            key={0}
            imageSrc="/placeholder.svg?height=400&width=600&text=3D+Concepting"
            imageAlt="3D Concepting Process"
            title="From Sketch to Screen"
            description="Our 3D concepting process allows us to rapidly prototype and visualize new footwear designs. Using cutting-edge 3D modeling software, we explore various shapes, materials, and color combinations before moving to physical prototypes. This approach saves time and resources while allowing for greater creative exploration."
            project={projects[0]}
          />
        </div>
      </section>

      {/* Development */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter text-center">
            Development
            <span className="text-orange-600">.</span>
          </h2>
          <p className="mb-12 text-xl text-gray-600 text-center">Transforming concepts into tangible products</p>
          <ExpandableImageSection
            key={1}
            imageSrc="/placeholder.svg?height=400&width=600&text=Development"
            imageAlt="Footwear Development Process"
            title="Crafting Excellence"
            description="Our development process is where innovative designs become tangible products. We work closely with manufacturers to ensure that every detail of our 3D concepts is faithfully reproduced in the final product. This stage involves material selection, structural engineering, and rigorous testing to guarantee that our footwear meets the highest standards of quality and performance."
            project={projects[1]}
          />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-24 sm:py-32">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Let's work together
              <span className="text-orange-600">.</span>
            </h2>
            <p className="max-w-[600px] text-gray-500">
              I'm always open to new projects and collaborations. Feel free to reach out and let's create something amazing.
            </p>
            <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
          <p className="text-sm text-gray-500"> 2024. All rights reserved.</p>
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

function ExpandableImageSection({ imageSrc, imageAlt, title, description, project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 relative overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            style={{ 
              transform: isExpanded 
                ? `translate(${project.horizontalOffset || 0}px, ${project.verticalOffset || 0}px) scale(${1.05 * (project.zoom ? project.zoom / 100 : 1)})` 
                : `translate(${project.horizontalOffset || 0}px, ${project.verticalOffset || 0}px) scale(${project.zoom ? project.zoom / 100 : 1})`,
              transformOrigin: 'center center'
            }}
          />
        </div>
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    title: "IDA Sports",
    slug: "urban-runner-collection",
    description: "Anatomically correct women's football cleats designed for speed and agility.",
    year: "2018",
    image: "/ida_boots_coverimg.png",
    zoom: 100,
    horizontalOffset: 0,
    verticalOffset: 0,
    tags: ["Athletic", "Innovation"]
  },
  {
    title: "Foundation Trainer",
    slug: "foundation-trainer",
    description: "Innovative training footwear for powerlifters and athletes designed for Australian brand Ryderwear",
    year: "2024",
    image: "/foundation_cover.png",
    zoom: 150,
    horizontalOffset: 20,
    verticalOffset: 60,
    tags: ["Sustainable", "Lifestyle"]
  },
  {
    title: "Wilson 'Intrigue' Signature",
    slug: "wilson-intrigue",
    description: "3D visualtion and development for Wilson's Marta Kostyuk signature shoe.",
    year: "2023",
    image: "/wilson_cover2.jpg",
    zoom: 100,
    horizontalOffset: 0,
    verticalOffset: 0,
    tags: ["Collaboration", "Limited"]
  },
  {
    title: "Performance Elite",
    slug: "performance-elite",
    description: "Professional-grade athletic footwear engineered for maximum performance and comfort.",
    year: "",
    image: "/placeholder.svg?height=450&width=600",
    zoom: 100,
    horizontalOffset: 0,
    verticalOffset: 0,
    tags: ["Professional", "Sport"]
  },
  {
    title: "Heritage Collection",
    slug: "heritage-collection",
    description: "Reimagining classic silhouettes with contemporary materials and techniques.",
    year: "",
    image: "/placeholder.svg?height=450&width=600",
    zoom: 100,
    horizontalOffset: 0,
    verticalOffset: 0,
    tags: ["Classic", "Premium"]
  },
  {
    title: "Future Tech Series",
    slug: "future-tech-series",
    description: "Experimental designs pushing the boundaries of footwear technology and style.",
    year: "",
    image: "/placeholder.svg?height=450&width=600",
    zoom: 100,
    horizontalOffset: 0,
    verticalOffset: 0,
    tags: ["Innovation", "Tech"]
  }
]

export default HomePage
