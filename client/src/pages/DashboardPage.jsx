import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove JWT token
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <h1 className="text-3xl font-bold text-green-700">Welcome to our Dashboard!</h1>
            <button
                onClick= {handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition"
            >
                Logout
            </button>
        </div>
    );
}