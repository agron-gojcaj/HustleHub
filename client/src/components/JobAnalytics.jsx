import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const STATUS_COLORS = {
    Applied: "#2563eb",
    Interviewing: "#fbbf24",
    Offer: "#10b981",
    Rejected: "#ef4444",
};

export default function JobAnalytics() {
    const [counts, setCounts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/applications", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const statusCounts = res.data.reduce((acc, job) => {
                acc[job.status] = (acc[job.status] || 0) + 1;
                return acc;
            }, {});
            setCounts(statusCounts);
            setLoading(false);
        };
        fetchJobs();
    }, []);

    const data = Object.entries(counts).map(([status, value]) => ({
        name: status,
        value,
    }));

    if (loading) return <div>Loading analytics...</div>

    return (
        <div className="w-full max-w-xl mx-auto mb-10">
            <h3 className="text-lg font-semibold mb-2">Application Status Overview</h3>
            <div className="flex gap-8 items-center">
                {/* Status Summary */}
                <ul className="space-y-1 min-w-[130px]">
                    {["Applied", "Interviewing", "Offer", "Rejected"].map(status => (
                        <li key={status}>
                            <span
                                className="inline-block w-3 h-3 rounded-full mr-2"
                                style={{ background: STATUS_COLORS[status] }}
                            ></span>
                            {status}: <b>{counts[status] || 0}</b>
                        </li>
                    ))}
                </ul>
                {/* Pie Chart */}
                <div className="flex-1 min-w-[200px]" style={{ height: 180 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                label
                            >
                                {data.map((entry, idx) => (
                                    <Cell key={`cell-${idx}`} fill ={STATUS_COLORS[entry.name] || "#888"} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}