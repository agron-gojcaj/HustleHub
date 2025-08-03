import JobAnalytics from "../components/JobAnalytics";

export default function AnalyticsPage() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <JobAnalytics />
            {/* Additional analytics components can be added here */}
        </div>
    )
}