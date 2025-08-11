import SideBar from "./SideBar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full">
            <SideBar />
            <main className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</main>
        </div>
    );
}