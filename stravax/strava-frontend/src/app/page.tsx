import StravaActivities from '@/components/strava-activities'

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Strava Activities</h1>
      <StravaActivities />
    </main>
  )
}
