import { NavLink } from 'react-router-dom';
import { Home, Users, Settings, Info } from 'lucide-react';

export default function Sidebar() {
  const menus = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl uppercase text-indigo-500 font-bold">MyApp</h1>
      </div>
      <ul className="flex flex-col py-4">
        {menus.map((menu, index) => (
          <li key={index}>
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                `flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-indigo-400 ${
                  isActive ? 'bg-gray-700 text-indigo-400 border-l-4 border-indigo-400' : ''
                }`
              }
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <menu.icon size={20} />
              </span>
              <span className="text-sm font-medium">{menu.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}