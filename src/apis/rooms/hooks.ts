// src/apis/room/hooks.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRoom, getAvailableRooms } from './apis';
import { RoomDTO, CreateRoomPayload, AvailableRoomsQuery } from './apis';

const useRoomQueryClient = () => useQueryClient();

// Create a new room
export const useCreateRoom = () => {
  const queryClient = useRoomQueryClient();
  return useMutation<RoomDTO, unknown, CreateRoomPayload>({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableRooms'] });
    },
  });
};

// Get available rooms (returns RoomDTO[])
export const useGetAvailableRooms = (query: AvailableRoomsQuery) => {
  return useQuery<RoomDTO[]>({
    queryKey: ['availableRooms', query],
    queryFn: () => getAvailableRooms(query),
    enabled: true,
  });
};