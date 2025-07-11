export default function JobDetailsModal({ job, onClose }) {
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
                <p className="text-gray-500 text-sm mt-4">
                    Created: {new Date(job.createdAt).toLocaleString()}
                </p>
                {job.updatedAt && (
                    <p className="text-gray-500 text-sm">
                        Last updated: {new Date(job.updatedAt).toLocaleString()}
                    </p>
                )}
            </div> 
        </div>
    )
}