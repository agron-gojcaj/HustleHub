import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("http://localhost:5000/api/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setForm({username: res.data.username, email: res.data.email, password: "" });
            } catch {
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await axios.put("http://localhost:5000/api/auth/profile", form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Profile updated!");
            setForm(f => ({ ...f, password: "" })); // clear password after update
        } catch {
            toast.error("Failed to update profile");
        }
    };

    if (loading) return <div>Loading profile...</div>

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Username</label>
                    <input
                        name="username"
                        className="border rounded px-3 py-2 w-full"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">New Password</label>
                    <input
                        name="password"
                        type="password"
                        className="border rounded px-3 py-2 w-full"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                        minLength={6}
                    />
                </div>
                <button className="bg-blue-600 text-white rounded px-4 py-2 font-semibold" type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    )
}