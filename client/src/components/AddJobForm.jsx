import { useState } from 'react';
import axios from 'axios';

export default function AddJobForm({ onJobAdded }) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("Applied");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                "http://localhost:5000/api/applications",
                { company, position, status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCompany("");
            setPosition("");
            setStatus("Applied");
            setLoading(false);
            if (onJobAdded) onJobAdded(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add job");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 w-full max-w-2xl mx-auto bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Add New Job</h3>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <div className="flex gap-2 mb-2">
                <input
                    className="border rounded px-3 py-2 w-1/3"
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                />
                <input
                    className="border rounded px-3 py-2 w-1/3"
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
                <select
                    className="border rounded px-3 py-2 w-1/3"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Job"}
            </button>
        </form>
    );
}