export default function About() {
  return (
    <div className="space-y-6">
      <h3 className="text-gray-700 text-3xl font-medium">About</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h4 className="text-xl font-bold mb-4">React Admin Dashboard</h4>
        <p className="text-gray-600 mb-4">
          This project demonstrates a simple but modern admin layout built with React, React Router, Tailwind CSS, and Leaflet API. 
        </p>
        <p className="text-gray-600 mb-4">
          Features include a responsive sidebar, nested routing with an active state, and a beautiful UI structure ready to be expanded.
        </p>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}