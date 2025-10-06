import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Folders", path: "/dashboard/folders" },
    { name: "Files", path: "/dashboard/files" },
  ];

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 h-screen fixed top-0 left-0 shadow-lg flex flex-col justify-between">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">ERP Clouds</h2>
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition ${location.pathname === item.path
                    ? "bg-gray-300 dark:bg-gray-800 font-semibold"
                    : ""
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
