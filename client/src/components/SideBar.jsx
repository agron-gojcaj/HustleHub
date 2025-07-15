import { Link, useLocation } from 'react-router-dom';
import { User, BarChart2, Home, Users } from 'lucide-react';

export default function SideBar() {
    const { pathname } = useLocation();

    const navLinks = [
        { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
        { to: "/analytics", label: "Analytics", icon: <BarChart2 size={18} /> },
        { to: "/profile", label: "Profile", icon: <User size={18} /> },
        { to: "/contacts", label: "Contacts", icon: <Users size={18} /> },
    ];

    return (
        <aside className="bg-blue-700 text-white w-48 min-h-screen flex flex-col shadow-lg">
            <div className="p-4 font-bold text-xl tracking-wide border-b border-blue-900">
                HustleHub
            </div>
            <nav className="flex-1 flex flex-col py-4 gap-1">
                {navLinks.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center gap-2 px-6 py-2 transition hover:bg-blue-900 rounded-r-full ${
                            pathname === link.to ? "bg-blue-900 font-semibold" : ""
                        }`}
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                ))}
            </nav>
            <button className="mx-6 mb-6 mt-auto py-2 bg-blue-900 rounded font-semibold hover:bg-blue-800">
                Log Out
            </button>
        </aside>
    );
}