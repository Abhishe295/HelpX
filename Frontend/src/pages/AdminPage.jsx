import { useEffect } from "react";
import { useAdminStore } from "../store/adminStore";
import ChatBox from "../components/ChatBox";

const AdminPage = () => {
  const adminStore = useAdminStore();

  useEffect(() => {
    adminStore.fetchUsers();
    adminStore.fetchHelpers();
    adminStore.fetchBookings();
    adminStore.fetchStats();
  }, []);

  return (
    <div className="space-y-6">

      <div className="border p-4 rounded">
        <div>Total Users: {adminStore.stats?.totalUsers}</div>
        <div>Total Helpers: {adminStore.stats?.totalHelpers}</div>
        <div>Total Bookings: {adminStore.stats?.totalBookings}</div>
      </div>

      <div className="border p-4 rounded">
        <div>All Bookings</div>
        {adminStore.bookings.map((b) => (
          <div key={b._id} className="border p-2 mb-2">
            {b.status}
          </div>
        ))}
      </div>

      <ChatBox receiverId="SOME_USER_ID" />

    </div>
  );
};

export default AdminPage;
