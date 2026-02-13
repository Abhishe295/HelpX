import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuthStore } from "../store/authStores";

const Layout = ({ children }) => {
  const { user } = useAuthStore();

  return (
    <div>
      <Navbar />

      <div className="relative">
        {user && <Sidebar />}
        <div className={`${user ? "ml-[35%] px-10 py-6" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
