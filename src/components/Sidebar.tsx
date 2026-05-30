import { NavLink } from "react-router-dom";
import { Home, Users, Settings, Info } from "lucide-react";
import type { FC } from "react";

interface MenuItem {
  name: string;
  path: string;
  icon: FC<{ size: number }>;
}

const Sidebar: FC = () => {
  const menus: MenuItem[] = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Users", path: "/users", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">MyApp</h1>
      </div>
      <nav className="flex flex-col py-4">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <menu.icon size={20} />
            <span>{menu.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
