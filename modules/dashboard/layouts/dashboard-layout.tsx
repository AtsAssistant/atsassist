import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {



    return (
        <div>
            <NavBar />
            <Sidebar />
            {children}
        </div>
    );
};