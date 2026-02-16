// room_components/room_card.tsx

import { RoomDTO } from "../../../../../apis/rooms/apis";
import { useSelector } from "react-redux";
import { RootState } from "../../../../entities/store";
import { useCreateBooking } from "../../../../../apis/booking/hooks";
interface RoomCardProps {
  rooms: RoomDTO[];
}

const RoomCard = ({ rooms }: RoomCardProps) => {
  const darkmode = useSelector((state: RootState) => state.theme.isDark);
  const { mutate: createBooking } = useCreateBooking();
    
  const handleBookNow = (room: RoomDTO) => {
    // You'll need guest_id from auth context or Redux — for now, placeholder
    // In real app, get guest_id from authenticated user


    const payload = {
      room_id: room.room_id,
      check_in_date: "2026-02-01T14:00:00Z", // TODO: get from form or date picker
      check_out_date: "2026-02-05T11:00:00Z", // TODO: get from form or date picker
      total_price: room.base_price_per_night, // assuming this matches expected format
    };

    createBooking(payload);
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
      {rooms.map((room) => {
        const isAvailable = room.status === 'available';
        const price = parseFloat(room.base_price_per_night).toFixed(2);

        return (
          <div
            key={room.room_id}
            className={`border ${darkmode ? "bg-dark border-light" : "bg-light border-dark"} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col ${
              !isAvailable ? 'opacity-80' : ''
            }`}
          >
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`${darkmode ? "bg-dark" : "bg-light"} px-3 py-1 text-xs font-semibold rounded-full`}
              >
                {isAvailable ? 'Available' : 'Booked'}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-grow">
              <div className="flex justify-between items-start mb-3">
                <h2 className={`${darkmode ? "text-light" : "text-dark"} text-xl font-bold`}>
                  Room {room.room_number}
                </h2>
                <span className={`${darkmode ? "bg-indigo-50" : "bg-pink"} text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded`}>
                  {room.room_type.toUpperCase()}
                </span>
              </div>

              <div className="mt-2 mb-4">
                <p className={`text-2xl font-bold ${darkmode ? "text-light" : "text-dark"}`}>
                  ${price}
                  <span className="text-sm font-normal text-gray-500">/night</span>
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2h5m10-8V9a2 2 0 00-2-2H9a2 2 0 00-2 2v3m7 0h-4"
                    />
                  </svg>
                  Max {room.max_occupancy} guests
                </div>
              </div>

              {/* Amenities as Badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {room.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <div className="px-5 pb-5">
              <button
                disabled={!isAvailable}
                onClick={() => handleBookNow(room)}
                className={`${darkmode ? "text-dark bg-light" : "text-light bg-dark"} w-full py-2.5 px-4 rounded-lg font-medium transition-colors`}
              >
                {isAvailable ? 'Book Now' : 'Unavailable'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomCard;