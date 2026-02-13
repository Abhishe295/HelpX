import { Link } from "react-router-dom";
import { Palette, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStores";
import { socket } from "../socket";
import { useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (user) {
      socket.emit("registerUser", user.id);
    }
  }, [user]);

  return (
    <div className="navbar bg-base-100 shadow-md px-8 sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">
          HelperHub
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/theme">
          <Palette />
        </Link>

        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <span className="badge badge-primary mr-2">
                {user.role}
              </span>
              {user.name}
            </label>

            <ul className="dropdown-content menu bg-base-100 rounded-box w-40 shadow">
              <li>
                <button onClick={logout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
