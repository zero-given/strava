'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StravaActivities } from "@/components/strava-activities"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'yellow' }}>
      {/* Hero Landing */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="text-center z-10 px-4">
          <h1 className="text-7xl font-bold mb-4 text-orange-500 transform hover:scale-105 transition-transform duration-300">
            STRIDE
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
            your ai running companion
          </p>
          <Button 
            variant="default" 
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4 shadow-orange-500/20 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Journey
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className="w-6 h-6 text-gray-400"
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        {/* Integration Section */}
        <section className="relative text-center py-16 mb-16 rounded-2xl bg-black/10 backdrop-blur-sm shadow-lg transform hover:shadow-xl transition-all duration-300">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500 rounded-l-2xl" />
          <div className="px-8">
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Welcome to Strava Integration</h2>
            <p className="text-sm text-gray-600 mb-8">Track your fitness journey and analyze your performance</p>
            <div className="space-x-4">
              <Button 
                variant="default" 
                size="default"
                className="bg-orange-500 hover:bg-orange-600 text-sm px-6"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="default"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 text-sm px-6"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="rounded-2xl p-8 bg-black/10 backdrop-blur-sm shadow-lg mb-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Your Activities Dashboard</h2>
          <StravaActivities />
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Activity Tracking",
              description: "Monitor your runs, rides, and other activities"
            },
            {
              title: "Performance Analytics",
              description: "Get insights into your performance trends"
            },
            {
              title: "Goal Setting",
              description: "Set and track your fitness goals"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="relative p-6 rounded-xl bg-black/10 backdrop-blur-sm shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-0 left-4 right-4 h-0.5 bg-orange-500/20" />
              <h3 className="text-base font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
