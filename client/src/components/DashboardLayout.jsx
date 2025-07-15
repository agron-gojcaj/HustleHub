import SideBar from "./SideBar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <main className="flex-1 bg-gray-50 p-6">{children}</main>
        </div>
    );
}