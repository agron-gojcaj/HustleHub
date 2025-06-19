import { useEffect, useState } from 'react';
import axios from 'axios';

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("http://localhost:5000/api/applications", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setJobs(res.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load job applications");
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return <div>Loading jobs...</div>;
    if (error) return <div className="text-red-600">{error}</div>;
    if (!jobs.length) return <div>No job applications found.</div>

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr>
                        <th className="p-2 text-left">Company</th>
                        <th className="p-2 text-left">Position</th>
                        <th className="p-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job._id} className="border-t">
                            <td className="p-2">{job.company}</td>
                            <td className="p-2">{job.position}</td>
                            <td className="p-2">{job.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}