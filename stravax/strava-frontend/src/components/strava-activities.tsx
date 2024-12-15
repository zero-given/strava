'use client'

import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Activity {
  id: number
  name: string
  type: string
  distance: number
  moving_time: number
  average_speed: number
  total_elevation_gain: number
  start_date_local: string
  kudos_count: number
  achievement_count: number
  average_heartrate?: number
  max_heartrate?: number
  splits_metric?: Array<{
    elevation_difference: number
    average_speed: number
  }>
}

interface ActivityDetailProps {
  activity: Activity
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  } else {
    return 'Just now'
  }
}

function formatPace(speedMps: number) {
  const paceMinPerKm = 16.6667 / speedMps
  const minutes = Math.floor(paceMinPerKm)
  const seconds = Math.round((paceMinPerKm - minutes) * 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')} /km`
}

function ActivityDetail({ activity }: ActivityDetailProps) {
  const timeAgo = formatTimeAgo(activity.start_date_local)
  const pace = formatPace(activity.average_speed)
  const distance = (activity.distance / 1000).toFixed(2)
  const duration = Math.floor(activity.moving_time / 60)
  const elevation = Math.round(activity.total_elevation_gain)

  // Prepare data for the elevation chart
  const elevationData = activity.splits_metric?.map((split, index) => ({
    x: (index + 1).toString(),
    y: split.elevation_difference
  })) || []

  const elevationChartData = {
    labels: elevationData.map(d => d.x),
    datasets: [
      {
        label: 'Elevation Difference (m)',
        data: elevationData.map(d => d.y),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      }
    ]
  }

  const elevationChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Elevation Profile'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Elevation (m)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Kilometer Splits'
        }
      }
    }
  }

  // Prepare data for the pace chart
  const paceData = activity.splits_metric?.map((split, index) => ({
    x: (index + 1).toString(),
    y: split.average_speed
  })) || []

  const paceChartData = {
    labels: paceData.map(d => d.x),
    datasets: [
      {
        label: 'Pace (m/s)',
        data: paceData.map(d => d.y),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      }
    ]
  }

  const paceChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pace Profile'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Speed (m/s)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Kilometer Splits'
        }
      }
    }
  }

  // Prepare data for the heart rate chart if available
  const hasHeartRateData = activity.average_heartrate && activity.max_heartrate

  const heartRateData = {
    labels: ['Average', 'Maximum'],
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: hasHeartRateData ? [activity.average_heartrate, activity.max_heartrate] : [],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(255, 99, 132, 0.5)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  const heartRateOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Heart Rate Analysis'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'BPM'
        }
      }
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold">{activity.name}</h3>
          <p className="text-gray-500">{timeAgo}</p>
        </div>
        <Badge variant="secondary">{activity.type}</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Distance</p>
          <p className="text-xl font-semibold">{distance} km</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="text-xl font-semibold">{duration} min</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Pace</p>
          <p className="text-xl font-semibold">{pace}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Elevation</p>
          <p className="text-xl font-semibold">{elevation} m</p>
        </div>
      </div>

      {activity.splits_metric && activity.splits_metric.length > 0 && (
        <div className="space-y-6">
          <div className="h-[200px]">
            <Line data={elevationChartData} options={elevationChartOptions} />
          </div>
          <div className="h-[200px]">
            <Line data={paceChartData} options={paceChartOptions} />
          </div>
        </div>
      )}

      {hasHeartRateData && (
        <div className="h-[200px]">
          <Bar data={heartRateData} options={heartRateOptions} />
        </div>
      )}

      <div className="flex gap-2">
        {activity.kudos_count > 0 && (
          <Badge variant="secondary">
            {activity.kudos_count} kudos
          </Badge>
        )}
        {activity.achievement_count > 0 && (
          <Badge variant="secondary">
            {activity.achievement_count} achievements
          </Badge>
        )}
      </div>
    </Card>
  )
}

export function StravaActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const connectStrava = () => {
    window.location.href = 'http://localhost:5000/';
  };

  const retryConnection = () => {
    setLoading(true);
    setError(null);
    fetchActivities();
  };

  const fetchActivities = () => {
    fetch('http://localhost:5000/api/activities', {
      credentials: 'include'  // Include credentials in the request
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setIsAuthenticated(false);
            throw new Error('Unauthorized');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data) return;
        
        if (Array.isArray(data)) {
          const runningActivities = data.filter((activity: Activity) => activity.type === 'Run');
          setActivities(runningActivities);
          if (runningActivities.length > 0) {
            setSelectedActivity(runningActivities[0]);
          }
          setIsAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError('Failed to load activities. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    // Check for error in URL
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');
    if (errorParam) {
      let errorMessage = 'Failed to authenticate with Strava';
      switch (errorParam) {
        case 'token_error':
          errorMessage = 'Failed to get access token from Strava';
          break;
        case 'no_code':
          errorMessage = 'No authorization code received from Strava';
          break;
        case 'token_parse_error':
          errorMessage = 'Error processing Strava response';
          break;
        case 'access_denied':
          errorMessage = 'Access denied to Strava account';
          break;
        default:
          errorMessage = `Authentication error: ${errorParam}`;
      }
      setError(errorMessage);
      setLoading(false);
      setIsAuthenticated(false);
      // Clear the error from URL to prevent it from persisting
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-sm">
        <p className="text-red-600 mb-4">{error}</p>
        {!isAuthenticated && (
          <button
            onClick={connectStrava}
            className="bg-[#FC4C02] text-white px-6 py-2 rounded-md hover:bg-[#E34402] transition-colors mb-4"
          >
            Connect with Strava
          </button>
        )}
        <button
          onClick={retryConnection}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">No activities found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fr,1.5fr] gap-8">
      {/* Activities List */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className={`p-4 rounded-lg cursor-pointer ${
              selectedActivity?.id === activity.id ? 'bg-orange-100' : 'bg-white'
            } hover:bg-orange-50`}
            onClick={() => setSelectedActivity(activity)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{activity.name}</h3>
                  <span className="text-sm text-gray-500">
                    {formatTimeAgo(activity.start_date_local)}
                  </span>
                </div>
                <div className="flex gap-2">
                  {activity.kudos_count > 0 && (
                    <Badge variant="secondary">
                      {activity.kudos_count} kudos
                    </Badge>
                  )}
                  {activity.achievement_count > 0 && (
                    <Badge variant="secondary">
                      {activity.achievement_count} achievements
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Distance</p>
                  <p className="font-medium text-gray-900">{(activity.distance / 1000).toFixed(2)} km</p>
                </div>
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">{Math.floor(activity.moving_time / 60)} min</p>
                </div>
                <div>
                  <p className="text-gray-500">Pace</p>
                  <p className="font-medium text-gray-900">{formatPace(activity.average_speed)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Elevation</p>
                  <p className="font-medium text-gray-900">{Math.round(activity.total_elevation_gain)} m</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Details */}
      {selectedActivity && (
        <div className="sticky top-4">
          <ActivityDetail activity={selectedActivity} />
        </div>
      )}
    </div>
  );
}

export default StravaActivities
