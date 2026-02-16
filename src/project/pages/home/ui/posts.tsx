// Posts.tsx

import { useState } from 'react';
import { useGetAvailableRooms } from '../../../../apis/rooms/hooks';
import { AvailableRoomsQuery } from '../../../../apis/rooms/apis';
import RoomCard from './room_components/room_card';


const Posts = () => {
  const [query] = useState<AvailableRoomsQuery>({
    room_types: ['SINGLE', 'DOUBLE'],
    min_occupancy: 1,
    amenities_required: [],
    limit: 10,
    offset: 0,
  });

  const { data, isLoading, error } = useGetAvailableRooms(query);

  if (isLoading) {
    return (
      <div className="w-full overflow-auto flex items-center justify-center h-screen">
        Loading available rooms...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full overflow-auto flex items-center justify-center text-red-500 h-screen">
        Failed to load rooms. Please try again.
      </div>
    );
  }

  const rooms = data ?? [];

  return (
    <div className="w-full  overflow-auto p-6">
      

      {rooms.length > 0 ? (
        <RoomCard rooms={rooms} />
      ) : (
        <p>No available rooms match your criteria.</p>
      )}

      <div className="mt-6 text-gray-500">
        Showing {rooms.length} rooms
      </div>

    </div>
  );
};

export default Posts;