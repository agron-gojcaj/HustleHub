import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });
            alert(`Logged in! Token: ${res.data.token}`);
            // Now store the token (e.g. in localStorage or context)
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>
                {error && <div className="text-red-600-mb-2">{error}</div>}
                <input 
                    type="email"
                    placeholder="Email"
                    className="w-full mb-2 px-3 py-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-3 py-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button 
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
};