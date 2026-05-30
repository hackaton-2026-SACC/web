import { useState } from 'react'
import type { FC, FormEvent } from 'react'
import { Save, Bell, Lock, User, Globe } from 'lucide-react'

interface SettingsFormData {
  siteName: string
  email: string
  notifications: boolean
}

const Settings: FC = () => {
  const [formData, setFormData] = useState<SettingsFormData>({
    siteName: 'MyApp Dashboard',
    email: 'admin@example.com',
    notifications: true,
  })

  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('Settings saved:', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your application preferences and configuration.</p>
      </div>

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <span className="font-medium">Settings saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium cursor-pointer">
              <Globe size={20} />
              <span>General</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium cursor-pointer">
              <Bell size={20} />
              <span>Notifications</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium cursor-pointer">
              <Lock size={20} />
              <span>Security</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium cursor-pointer">
              <User size={20} />
              <span>Account</span>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* General Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">General Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Site Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    value={formData.siteName}
                    onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">The name of your application</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">Your primary contact email</p>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                  <input 
                    type="checkbox" 
                    id="notifications"
                    checked={formData.notifications}
                    onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="notifications" className="font-medium text-gray-900 cursor-pointer">Email Notifications</label>
                    <p className="text-sm text-gray-500 mt-1">Receive email updates when important events occur</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                  <input 
                    type="checkbox" 
                    defaultChecked
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer mt-1"
                  />
                  <div className="flex-1">
                    <label className="font-medium text-gray-900">Weekly Report</label>
                    <p className="text-sm text-gray-500 mt-1">Get a summary of your activity every week</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <input 
                    type="checkbox" 
                    defaultChecked
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer mt-1"
                  />
                  <div className="flex-1">
                    <label className="font-medium text-gray-900">Security Alerts</label>
                    <p className="text-sm text-gray-500 mt-1">Be notified of security events and login attempts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Save size={18} />
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings