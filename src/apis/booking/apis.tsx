// src/apis/booking/apis.ts

import { AxiosError } from 'axios';
import { refreshToken } from '../user/authentication/Api';
import { bookingServiceClient } from '../client';

// Auth header helper
const getAuthHeader = async () => {
  try {
    const { access } = await refreshToken();
    return {
      Authorization: `Bearer ${access}`,
    };
  } catch (err) {
    console.error('Failed to refresh token for booking service auth header');
    throw err;
  }
};

// BookingDTO matches the fields returned by your booking service
export interface BookingDTO {
  id: string;
  room_id: string;
  check_in_date: string; // ISO 8601 format
  check_out_date: string; // ISO 8601 format
  total_price: string; // e.g., "120.00"
  status: string; // e.g., "confirmed", "pending", etc.
  created_at: string;
  updated_at: string;
}

export interface CreateBookingPayload {
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  total_price: string;
}

// CREATE a new booking
export const createBooking = async (
  payload: CreateBookingPayload
): Promise<BookingDTO> => {
  try {
    const headers = await getAuthHeader();

    const response = await bookingServiceClient.post<BookingDTO>(
      '/',
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
      console.error('Create booking failed:', error.response?.data || error.message);
    }
    throw error;
  }
};