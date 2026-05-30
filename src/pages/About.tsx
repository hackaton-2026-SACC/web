import type { FC } from 'react'
import { Code, Zap, Layers } from 'lucide-react'

const About: FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Pure React',
      description: 'Built with React 19, TypeScript, and modern best practices for type safety and performance.'
    },
    {
      icon: Zap,
      title: 'Fast & Responsive',
      description: 'Optimized with Vite for lightning-fast development and production builds.'
    },
    {
      icon: Layers,
      title: 'Multiple Pages',
      description: 'Complete routing with React Router, supporting nested routes and lazy loading.'
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">About</h1>
        <p className="text-gray-600 mt-1">Learn more about this application and its features.</p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-12 border border-blue-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">React Admin Dashboard</h2>
        <p className="text-lg text-gray-600 mb-4">
          A modern, responsive admin dashboard built with the latest web technologies. This project demonstrates 
          best practices in React development with TypeScript, beautiful UI design inspired by Google Material Design, 
          and powerful features for data visualization and management.
        </p>
        <p className="text-gray-600">
          Whether you're building a business intelligence tool, content management system, or analytics platform, 
          this dashboard provides a solid foundation with all the essentials you need.
        </p>
      </div>

      {/* Features Grid */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-none border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-lg p-8 shadow-none border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Technology Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'React', version: '19.2' },
            { name: 'TypeScript', version: '5.x' },
            { name: 'Tailwind CSS', version: '4.3' },
            { name: 'React Router', version: '6.x' },
            { name: 'Leaflet', version: 'Latest' },
            { name: 'Vite', version: '8.x' },
            { name: 'Lucide Icons', version: 'Latest' },
            { name: 'React Leaflet', version: '4.x' },
          ].map((tech, idx) => (
            <div key={idx} className="text-center p-4 rounded-lg bg-gray-50 border border-gray-200">
              <p className="font-semibold text-gray-900">{tech.name}</p>
              <p className="text-sm text-gray-500 mt-1">{tech.version}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-none border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-3">Responsive Design</h4>
          <p className="text-gray-600 mb-4">
            Beautiful on all devices - desktop, tablet, and mobile. The dashboard automatically adapts to different screen sizes.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-none border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-3">Easy to Customize</h4>
          <p className="text-gray-600 mb-4">
            Tailored with Tailwind CSS and organized component structure. Modify colors, layouts, and features quickly.
          </p>
        </div>
      </div>

      {/* Version and Links */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Current Version</p>
            <p className="text-2xl font-bold text-gray-900">1.0.0</p>
          </div>
          <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.547 2.91 1.185.092-.923.349-1.546.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.413 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
            View Source
          </a>
        </div>
        <p className="text-gray-600">
          Last updated on <span className="font-semibold">May 30, 2026</span> • Built with ❤️ for developers
        </p>
      </div>
    </div>
  )
}

export default About