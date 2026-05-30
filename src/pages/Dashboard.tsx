import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Activity, Users, DollarSign, Database, ArrowUpRight } from 'lucide-react'
import type { FC } from 'react'

interface Stat {
  name: string
  value: string
  change: string
  icon: FC<{ size: number }>
  color: string
  bgColor: string
}

const Dashboard: FC = () => {
  const stats: Stat[] = [
    { 
      name: 'Total Users', 
      value: '4,521', 
      change: '+12.5%',
      icon: Users, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Revenue', 
      value: '$12,400', 
      change: '+8.2%',
      icon: DollarSign, 
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Active Sessions', 
      value: '312', 
      change: '+5.1%',
      icon: Activity, 
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    { 
      name: 'Storage Used', 
      value: '42.5 GB', 
      change: '+2.3%',
      icon: Database, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ]

  const position: L.LatLngExpression = [-23.5505, -46.6333] // São Paulo coordinates

  const chartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 72 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 92 },
    { month: 'Jun', value: 88 },
  ]

  const maxValue = Math.max(...chartData.map(d => d.value))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Welcome back! Here's your performance overview.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-medium text-gray-600 truncate">{stat.name}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                <p className="text-xs md:text-sm text-green-600 font-medium mt-2 flex items-center gap-1 whitespace-nowrap">
                  <ArrowUpRight size={14} className="md:w-4 md:h-4" />
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.bgColor} p-2 md:p-3 rounded-lg shrink-0`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-2">
            <h2 className="text-base md:text-lg font-bold text-gray-900">Performance Trend</h2>
            <button className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
          </div>
          <div className="flex items-end justify-between gap-2 md:gap-4 h-48 md:h-64 overflow-x-auto">
            {chartData.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 min-w-max md:min-w-0">
                <div className="w-full bg-linear-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${(data.value / maxValue) * 180}px` }}></div>
                <span className="text-xs md:text-sm text-gray-600 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">Key Metrics</h2>
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-2 md:w-3 h-2 md:h-3 bg-blue-500 rounded-full shrink-0"></div>
                <span className="text-xs md:text-sm text-gray-700 truncate">Conversion</span>
              </div>
              <span className="font-bold text-gray-900 shrink-0 ml-2">3.24%</span>
            </div>
            <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-2 md:w-3 h-2 md:h-3 bg-green-500 rounded-full shrink-0"></div>
                <span className="text-xs md:text-sm text-gray-700 truncate">Bounce Rate</span>
              </div>
              <span className="font-bold text-gray-900 shrink-0 ml-2">24.5%</span>
            </div>
            <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-2 md:w-3 h-2 md:h-3 bg-pink-500 rounded-full shrink-0"></div>
                <span className="text-xs md:text-sm text-gray-700 truncate">Engagement</span>
              </div>
              <span className="font-bold text-gray-900 shrink-0 ml-2">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-2 md:w-3 h-2 md:h-3 bg-purple-500 rounded-full shrink-0"></div>
                <span className="text-xs md:text-sm text-gray-700 truncate">User Growth</span>
              </div>
              <span className="font-bold text-gray-900 shrink-0 ml-2">12.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 relative z-0">
        <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Location Overview</h2>
        <div className="h-64 sm:h-80 md:h-96 w-full rounded-lg overflow-hidden border border-gray-200 relative z-0">
          <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: '100%', width: '100%', zIndex: 0 }}
            zoomControl={false}
            touchZoom={true}
            dragging={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                Main Office <br /> São Paulo, Brasil.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard