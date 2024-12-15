'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StravaActivities } from "@/components/strava-activities"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <div className="size-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600" />
            <span className="text-xl font-bold">Run Analytics</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link className="text-sm font-medium hover:text-orange-600" href="/#dashboard">
              Dashboard
            </Link>
            <Link className="text-sm font-medium hover:text-orange-600" href="/eco-conscious-series">
              Eco Series
            </Link>
            <Link className="text-sm font-medium hover:text-orange-600" href="/urban-runner-collection">
              Urban Collection
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                Track Your Running Journey
                <span className="text-orange-600">.</span>
              </h1>
              <p className="text-gray-500 text-lg md:text-xl">
                Connect with Strava to analyze your runs, track your progress, and discover insights about your training.
              </p>
              <div className="flex gap-4">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Connect with Strava
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20" />
              <Image
                src="/placeholder.svg"
                alt="Running Analytics"
                width={600}
                height={450}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Your Running Dashboard
              <span className="text-orange-600">.</span>
            </h2>
            <p className="mt-4 text-gray-500 md:text-lg">
              Track your progress and analyze your performance
            </p>
          </div>
          <StravaActivities />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 rounded-lg border bg-white/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Activity Tracking</h3>
              <p className="text-gray-500">Monitor your runs with detailed metrics and visualizations</p>
            </div>
            <div className="p-6 rounded-lg border bg-white/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Performance Analysis</h3>
              <p className="text-gray-500">Get insights into your running patterns and improvements</p>
            </div>
            <div className="p-6 rounded-lg border bg-white/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Goal Setting</h3>
              <p className="text-gray-500">Set and track your running goals with smart metrics</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
