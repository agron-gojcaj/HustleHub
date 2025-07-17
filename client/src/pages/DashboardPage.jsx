import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JobList from "../components/JobList";
import AddJobForm from "../components/AddJobForm";
import JobAnalytics from "../components/JobAnalytics";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [jobRefreshKey, setJobRefreshKey] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const res = await axios.get("http://localhost:5000/api/auth/profile", {
                    headers: { Authorization: `Bearer ${token}`}
                });
                setUser(res.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                localStorage.removeItem("token");
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        toast.success("Logged out successfully!");
    };

    const handleJobAdded = () => setJobRefreshKey(prev => prev + 1);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-red-600">No user info found. Please log in again.</p>
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <h1 className="text-3xl font-bold text-green-700">Welcome to our Dashboard!</h1>
                <JobAnalytics />
                <AddJobForm onJobAdded={handleJobAdded} />
                <JobList  key={jobRefreshKey} />
                <div className="mb-6">
                    <p className="text-lg"><span className="font-bold">Username:</span> {user.username}</p>
                    <p className="text-lg"><span className="font-bold">Email:</span> {user.email}</p>
                </div>
                <button
                    onClick= {handleLogout}
                    className="px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </DashboardLayout>
    );
}