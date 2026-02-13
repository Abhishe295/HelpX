import { useAuthStore } from "../store/authStores";

const Sidebar = () => {
  const { user } = useAuthStore();
  if (!user) return null;

  return (
    <div className="fixed left-6 top-24 w-[30%] h-[80vh]
      backdrop-blur-xl bg-white/10 border border-white/20
      rounded-2xl shadow-xl p-6 overflow-y-auto">

      <div className="font-bold mb-4">Navigation</div>

      {user.role === "user" && (
        <>
          <div>Categories</div>
          <div>My Bookings</div>
          <div>Support</div>
        </>
      )}

      {user.role === "helper" && (
        <>
          <div>Incoming Jobs</div>
          <div>Earnings</div>
          <div>Support</div>
        </>
      )}

      {user.role === "admin" && (
        <>
          <div>Users</div>
          <div>Helpers</div>
          <div>Bookings</div>
          <div>Stats</div>
          <div>Support</div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
