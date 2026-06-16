import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./../styles/layout.css";

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="app-content">
        <Topbar />
        {children}
      </main>
    </div>
  );
}

export default AppLayout;