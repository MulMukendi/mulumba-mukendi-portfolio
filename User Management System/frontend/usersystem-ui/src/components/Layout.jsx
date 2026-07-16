import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function Layout() {
  return (
    
        <div className="flex min-h-screen bg-slate-100">
                <SideBar />

                <main className="flex-1">
                <Outlet />
                </main>
        </div>

  );
}