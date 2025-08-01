import { useState, useEffect } from 'react';

export default function ContactForm({ initialData = {}, onSubmit, onCancel, submitLabel = "Add Contact" }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        linkedin: "",
        notes: "",
        ...initialData
    });

    useEffect(() => {
        setForm(f => ({ ...f, ...initialData }));
    }, [initialData]);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
            <input required name="name" placeholder="Name" className="border px-2 py-1 rounded" value={form.name} onChange={handleChange} />
            <input name="email" placeholder="Email" className="border px-2 py-1 rounded" value={form.email} onChange={handleChange} />
            <input name="Company" placeholder="Company" className="border px-2 py-1 rounded" value={form.company} onChange={handleChange} />
            <input name="linkedin" placeholder="LinkedIn" className="border px-2 py-1 rounded" value={form.linkedin} onChange={handleChange} />
            <input name="notes" placeholder="Notes" className="border px-2 py-1 rounded" value={form.notes} onChange={handleChange} />
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">{submitLabel}</button>
            {onCancel && <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>}
        </form>
    );
}