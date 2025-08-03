import { useState, useEffect } from 'react';

export default function InterviewForm({ initialData = {}, onSubmit, onCancel, submitLabel = "Add Interview" }) {
    const [form, setForm] = useState({
        date: "",
        time: "",
        type: "",
        notes: "",
        ...initialData,
    });

    useEffect(() => {
        setForm(f => ({
            ...f,
            ...initialData,
            date: isoToDateInputValue(initialData.date),
            time: isoToTimeInputValue(initialData.date),
        }));
    }, [initialData]);

    function isoToDateInputValue(isoString) {
        if (!isoString) return "";
        const date = new Date(isoString);
        // Correct for timezone offset
        const tzOffset = date.getTimezoneOffset() * 60000;
        const localISODate = new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
        return localISODate;
    }

    function isoToTimeInputValue(isoString) {
        if (!isoString) return "";
        const date = new Date(isoString);
        // Local time in "HH:MM"
        return date.toTimeString().slice(0, 5);
    }

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        const localDateTime = new Date(`${form.date}T${form.time}`);
        onSubmit({ ...form, date: localDateTime.toISOString() });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
            <input
                required
                type="date"
                name="date"
                className="border px-2 py-1 rounded"
                value={form.date}
                onChange={handleChange}
            />
            <input
                type="time"
                name="time"
                className="border px-2 py-1 rounded"
                value={form.time}
                onChange={handleChange}
            />
            <select
                name="type"
                className="border px-2 py-1 rounded"
                value={form.type}
                onChange={handleChange}
            >
                <option value="Phone">Phone</option>
                <option value="Technical">Technical</option>
                <option value="On-site">On-site</option>
                <option value="HR">HR</option>
                <option value="Other">Other</option>
            </select>
            <input
                name="notes"
                placeholder="Notes"
                className="border px-2 py-1 rounded"
                value={form.notes}
                onChange={handleChange}
            />
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
                {submitLabel}
            </button>
            {onCancel && (
                <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-3 py-1 rounded">
                    Cancel
                </button>
            )}
        </form>
    );
}