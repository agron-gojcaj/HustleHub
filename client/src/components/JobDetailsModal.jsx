import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ContactForm from "./ContactForm";
import InterviewForm from "./InterviewForm";

export default function JobDetailsModal({ job, onClose }) {
    const [contacts, setContacts] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        company: "",
        linkedin: "",
        notes: "",
    });
    const [interviewForm, setInterviewForm] = useState({
        date: "",
        time: "",
        type: "",
        notes: "",
    });
    const [editingContactId, setEditingContactId] = useState(null);
    const [editingContactForm, setEditingContactForm] = useState({});
    const [editingInterviewId, setEditingInterviewId] = useState(null);
    const [editingInterviewForm, setEditingInterviewForm] = useState({});

    //Fetch contacts/interviews when modal opens
    useEffect(() => {
        if (!job) return;
        const token = localStorage.getItem("token");
        const fetchContacts = async () => {
            const res = await axios.get(
                `http://localhost:5000/api/contacts?associatedApplication=${job._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setContacts(res.data);
        };
        const fetchInterviews = async () => {
            const res = await axios.get(
                `http://localhost:5000/api/interviews?application=${job._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInterviews(res.data);
        };
        fetchContacts();
        fetchInterviews();
    }, [job]);

    const handleAddContact = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                "http://localhost:5000/api/contacts",
                { ...contactForm, associatedApplication: job._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setContacts((prev) => [...prev, res.data]);
            setContactForm({ name: "", email: "", company: "", linkedin: "", notes: "" });
            toast.success("Contact added!");
        } catch {
            toast.error("Failed to add contact");
        }
    };

    const handleAddInterview = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                "http://localhost:5000/api/interviews",
                { ...interviewForm, application: job._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInterviews((prev) => [...prev, res.data]);
            setInterviewForm({ date: "", time: "", type: "", notes: "" });
            toast.success("Interview added!");
        } catch {
            toast.error("Failed to add interview");
        }
    };

    const handleDeleteContact = async (contactId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:5000/api/contacts/${contactId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContacts((prev) => prev.filter((c) => c._id !== contactId));
            toast.success("Contact deleted!");
        } catch {
            toast.error("Failed to delete contact");
        }
    };

    const handleDeleteInterview = async (interviewId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:5000/api/interviews/${interviewId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInterviews((prev) => prev.filter((i) => i._id !== interviewId));
            toast.success("Interview deleted!");
        } catch {
            toast.error("Failed to delete interview");
        }
    };

    const handleEditContact = (contact) => {
        setEditingContactId(contact._id);
        setEditingContactForm({
            name: contact.name || "",
            email: contact.email || "",
            company: contact.company || "",
            linkedin: contact.linkedin || "",
            notes: contact.notes || "",
        });
    };

    const handleSaveContact = async (contactId, data) => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.put(
                `http://localhost:5000/api/contacts/${contactId}`,
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setContacts((prev) =>
                prev.map(c => (c._id === contactId ? res.data : c))
            );
            setEditingContactId(null);
            toast.success("Contact updated!");
        } catch {
            toast.error("Failed to update contact");
        }
    };

    const handleCancelEditContact = () => {
        setEditingContactId(null);
    };

    const handleEditInterview = (interview) => {
        setEditingInterviewId(interview._id);
        setEditingInterviewForm({
            date: interview.date || "",
            time: interview.time || "",
            type: interview.type || "Other",
            notes: interview.notes || ""
        });
    };

    const handleSaveInterview = async (interviewId, data) => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.put(
                `http://localhost:5000/api/interviews/${interviewId}`,
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInterviews((prev) =>
                prev.map(i => (i._id === interviewId ? res.data : i))
            );
            setEditingInterviewId(null);
            toast.success("Interview updated!");
        } catch {
            toast.error("Failed to update interview");
        }
    };

    const handleCancelEditInterview = () => {
        setEditingInterviewId(null);
    };

    if (!job) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded shadow-lg p-6 max-w-md w-full relative">
                <button 
                    className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-900"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-2">{job.position} @ {job.company}</h2>
                <p className="mb-2"><span className="font-semibold">Status:</span> {job.status}</p>
                <p className="mb-2"><span className="font-semibold">Applied Date:</span> {new Date(job.appliedDate).toLocaleDateString()}</p>
                {job.jobLink && (
                    <p className="mb-2">
                        <span className="font-semibold">Job Link:</span>{" "}
                        <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            {job.jobLink}
                        </a>
                    </p>
                )}
                {job.notes && (
                    <p className="mb-2"><span className="font-semibold">Notes:</span> {job.notes}</p>
                )}
                {job.updatedAt && (
                    <p className="text-gray-500 text-sm">
                        Last updated: {new Date(job.updatedAt).toLocaleString()}
                    </p>
                )}

                {/* Contacts Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Contacts</h3>
                    <ul className="mb-2">
                        {contacts.map((contact) => 
                            editingContactId === contact._id ? (
                                <li key={contact._id} className="border-b py-1 flex flex-col gap-1">
                                    <ContactForm
                                        initialData={editingContactForm}
                                        onSubmit={data => handleSaveContact(contact._id, data)}
                                        onCancel={handleCancelEditContact}
                                        submitLabel="Save"
                                    />
                                </li>
                            ) : (
                                <li key={contact._id} className="border-b py-1 flex justify-between items-center">
                                    <span>
                                        <span className="font-medium">{contact.name}</span>
                                        {contact.role ? ` (${contact.role})` : ""}
                                        {contact.email ? ` • ${contact.email}` : ""}
                                        {contact.company ? ` • ${contact.company}` : ""}
                                        {contact.linkedin ? (
                                            <>
                                                {" • "}
                                                <a
                                                    href={contact.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline"
                                                >
                                                    LinkedIn
                                                </a>
                                            </>
                                        ) : null}
                                        {contact.notes ? ` • ${contact.notes}` : ""}
                                    </span>
                                    <span className="flex gap-2">
                                        <button
                                            className="text-blue-600 px-2"
                                            onClick={() => handleEditContact(contact)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 px-2"
                                            onClick={() => handleDeleteContact(contact._id)}
                                        >
                                            Delete
                                        </button>
                                    </span>
                                </li>
                            )
                        )}
                    </ul>
                    {/* Add Contact Form */}
                    <form onSubmit={handleAddContact} className="flex flex-wrap gap-2 mb-4">
                        <input required placeholder="Name" name="name"
                            className="border px-2 py-1 rounded" value={contactForm.name}
                            onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} />
                        <input placeholder="Email" name="email"
                            className="border px-2 py-1 rounded" value={contactForm.email}
                            onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} />
                        <input placeholder="Company" name="company"
                            classname="border px-2 py-1 rounded" value={contactForm.company}
                            onChange={e => setContactForm(f => ({ ...f, company: e.target.value }))} />
                        <input placeholder="LinkedIn" name="linkedin"
                            className="border px-2 py-1 rounded" value={contactForm.linkedin}
                            onChange={e => setContactForm(f => ({ ...f, linkedin: e.target.value }))} />
                        <input placeholder="Notes" name="notes"
                            className="border px-2 py-1 rounded" value={contactForm.notes}
                            onChange={e => setContactForm(f => ({ ...f, notes: e.target.value }))} />
                        <button className="bg-blue-600 text-white px-3 py-1 rounded" type="submit">
                            Add Contact
                        </button>
                    </form>
                </div>
                {/* Interviews Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Interviews</h3>
                    <ul className="mb-2">
                        {interviews.map(interview => 
                            editingInterviewId === interview._id ? (
                                <li key={interview._id} className="border-b py-1 flex flex-col gap-1">
                                    <InterviewForm
                                        initialData={editingInterviewForm}
                                        onSubmit={data => handleSaveInterview(interview._id, data)}
                                        onCancel={handleCancelEditInterview}
                                        submitLabel="Save"
                                    />
                                </li>
                            ) : (
                                <li key={interview._id} classNname="border-b py-1 flex justify-between items-center">
                                    <span>
                                        <span className="font-medium">{interview.type}</span> •{" "}
                                        {new Date(interview.date).toLocaleDateString()}
                                        {interview.time ? ` ${interview.time}` : ""}
                                        {interview.notes ? ` • ${interview.notes}` : ""}
                                    </span>
                                    <span className="flex gap-2">
                                        <button
                                            className="text-blue-600 px-2"
                                            onClick={() => handleEditInterview(interview)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 px-2"
                                            onClick={() => handleDeleteInterview(interview._id)}
                                        >
                                            Delete
                                        </button>
                                    </span>
                                </li>
                            )
                        )}
                    </ul>
                    {/* Add Interview Form */}
                    <form onSubmit={handleAddInterview} className="flex flex-wrap gap-2 mb-4">
                        <input required type="date" name="date"
                            className="border px-2 py-1 rounded" value={interviewForm.date}
                            onChange={e => setInterviewForm(f => ({ ...f, date: e.target.value }))} />
                        <input type="time" name="time" step="600"
                            className="border px-2 py-1 rounded" value={interviewForm.time}
                            onChange={e => setInterviewForm(f => ({ ...f, time: e.target.value }))} />
                        <select name="type"
                            className="border px-2 py-1 rounded" value={interviewForm.type}
                            onChange={e => setInterviewForm(f => ({ ...f, type: e.target.value }))}>
                            <option value="Phone">Phone</option>
                            <option value="Technical">Technical</option>
                            <option value="On-site">On-site</option>
                            <option value="HR">HR</option>
                            <option value="Other">Other</option>
                        </select>
                        <input placeholder="Notes" name="notes"
                            className="border px-2 py-1 rounded" value={interviewForm.notes}
                            onChange={e => setInterviewForm(f => ({ ...f, notes: e.target.value }))} />
                        <button className="bg-blue-600 text-white px-3 py-1 rounded" type="submit">
                            Add Interview
                        </button>
                    </form>
                </div>
            </div> 
        </div>
    );
}