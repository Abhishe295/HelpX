import { useEffect } from "react";
import { useBookingStore } from "../store/bookingStore";
import { useHelperStore } from "../store/helperStore";
import BookingCard from "../components/BookingCard";
import ChatBox from "../components/ChatBox";

const HelperPage = () => {
  const bookingStore = useBookingStore();
  const helperStore = useHelperStore();

  useEffect(() => {
    bookingStore.fetchHelperBookings();
    helperStore.fetchHelperDashboard();
  }, []);

  return (
    <div className="space-y-6">

      <div className="border p-4 rounded">
        <div>Earnings: {helperStore.stats?.earnings}</div>

        <button
          className="btn btn-sm btn-primary mt-2"
          onClick={helperStore.toggleAvailability}
        >
          Toggle Availability
        </button>
      </div>

      <div className="border p-4 rounded">
        <div>Incoming / History</div>
        {bookingStore.bookings.map((b) => (
          <BookingCard key={b._id} booking={b} />
        ))}
      </div>

      <ChatBox receiverId="ADMIN_ID" />

    </div>
  );
};

export default HelperPage;
