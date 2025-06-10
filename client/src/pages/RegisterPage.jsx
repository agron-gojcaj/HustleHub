import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Make API call to /api/auth/register
        alert(`Registering as ${username}`);
    };

    return (
        <div className="min-h-screen flex item-center justify-center bg-green-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-green-600">Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full mb-2 px-3 py-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <button className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition">
                    Register
                </button>
            </form>
        </div>
    )
}