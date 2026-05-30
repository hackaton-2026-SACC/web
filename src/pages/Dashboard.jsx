import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Activity, Users, DollarSign, Database } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Total Users', value: '4,521', icon: Users, color: 'text-blue-500' },
    { name: 'Revenue', value: '$12,400', icon: DollarSign, color: 'text-green-500' },
    { name: 'Active Sessions', value: '312', icon: Activity, color: 'text-pink-500' },
    { name: 'Storage Used', value: '42.5 GB', icon: Database, color: 'text-purple-500' },
  ];

  const position = [-23.5505, -46.6333]; // São Paulo coordinates

  return (
    <div className="space-y-6">
      <h3 className="text-gray-700 text-3xl font-medium">Dashboard Overview</h3>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center">
            <div className={`p-4 rounded-full bg-gray-50 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="ml-4">
              <h4 className="text-2xl font-semibold text-gray-700">{stat.value}</h4>
              <div className="text-gray-500">{stat.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Location Overview</h4>
        <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
  );
}