// src/apis/room/apis.ts

import { AxiosError } from 'axios';
import { refreshToken } from '../user/authentication/Api';
import { roomServiceClient } from '../client';

// Auth header helper
const getAuthHeader = async () => {
  try {
    const { access } = await refreshToken();
    return {
      Authorization: `Bearer ${access}`,
    };
  } catch (err) {
    console.error('Failed to refresh token for room service auth header');
    throw err;
  }
};

// Updated RoomDTO to match actual API fields
export interface RoomDTO {
  room_id: string;
  room_number: string;
  room_type: string;
  base_price_per_night: string; // e.g., "1.2E+2"
  amenities: string[];
  max_occupancy: number;
  status: string; // e.g., "available"
  created_at: string;
  updated_at: string;
}

export interface CreateRoomPayload {
  room_number: string;
  room_type: string;
  base_price_per_night: string;
  amenities: string[];
  max_occupancy: number;
}

export interface AvailableRoomsQuery {
  room_types?: string[];
  min_occupancy?: number;
  amenities_required?: string[];
  limit?: number;
  offset?: number;
}

// CREATE a new room
export const createRoom = async (
  payload: CreateRoomPayload
): Promise<RoomDTO> => {
  try {
    const headers = await getAuthHeader();

    const response = await roomServiceClient.post<RoomDTO>(
      '/create/',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Create room failed:', error.response?.data || error.message);
    }
    throw error;
  }
};

// LIST available rooms → returns RoomDTO[] directly
export const getAvailableRooms = async (
  query: AvailableRoomsQuery
): Promise<RoomDTO[]> => {
  try {
    const headers = await getAuthHeader();

    const response = await roomServiceClient.post<RoomDTO[]>(
      '/available/',
      query,
      {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Fetch available rooms failed:', error.response?.data || error.message);
    }
    throw error;
  }
};