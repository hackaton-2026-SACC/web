export default function Settings() {
  return (
    <div className="space-y-6">
      <h3 className="text-gray-700 text-3xl font-medium">Settings</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Site Name</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" defaultValue="MyApp Dashboard" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" defaultValue="admin@example.com" />
          </div>
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">Email Notifications</label>
              <p className="text-gray-500">Get notified when someone updates a record.</p>
            </div>
          </div>
          <div>
            <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}