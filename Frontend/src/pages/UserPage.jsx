import { useEffect, useState } from "react";
import { useBookingStore } from "../store/bookingStore";
import { useHelperStore } from "../store/helperStore";
import BookingCard from "../components/BookingCard";
import ChatBox from "../components/ChatBox";

const UserPage = () => {
  const bookingStore = useBookingStore();
  const helperStore = useHelperStore();
  const [category, setCategory] = useState("");

  useEffect(() => {
    bookingStore.fetchUserBookings();
  }, []);

  return (
    <div className="space-y-6">

      <div className="border p-4 rounded">
        <div>Select Category</div>

        <select
          className="select select-bordered"
          onChange={(e) => {
            setCategory(e.target.value);
            helperStore.fetchHelpersByCategory(e.target.value);
          }}
        >
          <option>plumbing</option>
          <option>electrician</option>
          <option>cooking</option>
          <option>car cleaning</option>
          <option>house cleaning</option>
          <option>gardening</option>
        </select>

        <div className="mt-4">
          {helperStore.helpers.map((h) => (
            <div key={h._id} className="border p-2 mb-2">
              <div>{h.name}</div>
              <div>Rating: {h.averageRating}</div>

              <button
                className="btn btn-sm btn-primary"
                onClick={() =>
                  bookingStore.createBooking({
                    helperId: h._id,
                    category
                  })
                }
              >
                Book
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="border p-4 rounded">
        <div>My Bookings</div>
        {bookingStore.bookings.map((b) => (
          <BookingCard key={b._id} booking={b} />
        ))}
      </div>

      <ChatBox receiverId="ADMIN_ID" />

    </div>
  );
};

export default UserPage;
