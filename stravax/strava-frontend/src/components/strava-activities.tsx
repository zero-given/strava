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
      <div className="text-center p-8 bg-white rounded-lg shadow-sm border">
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
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors ml-4"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!activities.length) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-sm border">
        <p className="text-gray-500 mb-4">No running activities found. Start tracking your runs with Strava!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Activity Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Total Distance</h3>
          <p className="mt-2 text-3xl font-bold">
            {(activities.reduce((acc, curr) => acc + curr.distance, 0) / 1000).toFixed(1)} km
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Total Time</h3>
          <p className="mt-2 text-3xl font-bold">
            {Math.round(activities.reduce((acc, curr) => acc + curr.moving_time, 0) / 60)} min
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Avg. Pace</h3>
          <p className="mt-2 text-3xl font-bold">
            {formatPace(activities.reduce((acc, curr) => acc + curr.average_speed, 0) / activities.length)}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Total Elevation</h3>
          <p className="mt-2 text-3xl font-bold">
            {Math.round(activities.reduce((acc, curr) => acc + curr.total_elevation_gain, 0))} m
          </p>
        </div>
      </div>

      {/* Selected Activity Details */}
      {selectedActivity && (
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{selectedActivity.name}</h2>
              <p className="text-gray-500">{formatTimeAgo(selectedActivity.start_date_local)}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">
                {selectedActivity.kudos_count} kudos
              </Badge>
              <Badge variant="secondary">
                {selectedActivity.achievement_count} achievements
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Activity Charts */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Elevation Profile</h3>
                {selectedActivity.splits_metric && (
                  <Line
                    data={{
                      labels: selectedActivity.splits_metric.map((_, i) => `${i + 1}km`),
                      datasets: [
                        {
                          label: 'Elevation',
                          data: selectedActivity.splits_metric.map(split => split.elevation_difference),
                          borderColor: '#f97316',
                          backgroundColor: '#fdba74',
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Elevation (m)',
                          },
                        },
                      },
                    }}
                  />
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Pace Analysis</h3>
                {selectedActivity.splits_metric && (
                  <Bar
                    data={{
                      labels: selectedActivity.splits_metric.map((_, i) => `${i + 1}km`),
                      datasets: [
                        {
                          label: 'Pace',
                          data: selectedActivity.splits_metric.map(split => split.average_speed),
                          backgroundColor: '#f97316',
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Pace (min/km)',
                          },
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>

            {/* Activity Stats */}
            <div className="grid gap-4 content-start">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Distance</h3>
                <p className="text-2xl font-bold">{(selectedActivity.distance / 1000).toFixed(2)} km</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Time</h3>
                <p className="text-2xl font-bold">{Math.round(selectedActivity.moving_time / 60)} min</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Average Pace</h3>
                <p className="text-2xl font-bold">{formatPace(selectedActivity.average_speed)}</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Elevation Gain</h3>
                <p className="text-2xl font-bold">{Math.round(selectedActivity.total_elevation_gain)} m</p>
              </Card>
              {selectedActivity.average_heartrate && (
                <Card className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Average Heart Rate</h3>
                  <p className="text-2xl font-bold">{Math.round(selectedActivity.average_heartrate)} bpm</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Activity List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className={`p-4 cursor-pointer transition-colors hover:border-orange-200 ${
              selectedActivity?.id === activity.id ? 'border-orange-500' : ''
            }`}
            onClick={() => setSelectedActivity(activity)}
          >
            <h3 className="font-medium mb-2">{activity.name}</h3>
            <div className="text-sm text-gray-500">{formatTimeAgo(activity.start_date_local)}</div>
            <div className="mt-4 flex justify-between text-sm">
              <div>
                <div className="text-gray-500">Distance</div>
                <div className="font-medium">{(activity.distance / 1000).toFixed(1)} km</div>
              </div>
              <div>
                <div className="text-gray-500">Time</div>
                <div className="font-medium">{Math.round(activity.moving_time / 60)} min</div>
              </div>
              <div>
                <div className="text-gray-500">Pace</div>
                <div className="font-medium">{formatPace(activity.average_speed)}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StravaActivities
