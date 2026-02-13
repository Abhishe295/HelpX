import Timer from "./Timer";
import { useAuthStore } from "../store/authStores";
import { useBookingStore } from "../store/bookingStore";
import RatingBox from "./RatingBox";

const BookingCard = ({ booking }) => {
  const { user } = useAuthStore();
  const { acceptBooking, completeBooking } = useBookingStore();

  return (
    <div className="border p-4 rounded mb-4">

      <div>Status: {booking.status}</div>

      {booking.status === "accepted" && booking.arrivalTime && (
        <Timer arrivalTime={booking.arrivalTime} />
      )}

      {user.role === "helper" && booking.status === "waiting" && (
        <button
          className="btn btn-sm btn-primary mt-2"
          onClick={() => acceptBooking(booking._id)}
        >
          Accept
        </button>
      )}

      {user.role === "user" && booking.status === "accepted" && (
        <button
          className="btn btn-sm btn-success mt-2"
          onClick={() => completeBooking(booking._id)}
        >
          Job Done
        </button>
      )}

      {booking.status === "completed" && (
        <RatingBox bookingId={booking._id} />
      )}
    </div>
  );
};

export default BookingCard;
