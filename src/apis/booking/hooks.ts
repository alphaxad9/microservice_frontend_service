// src/apis/booking/hooks.ts

import { useMutation } from '@tanstack/react-query';
import { createBooking } from './apis';
import { BookingDTO, CreateBookingPayload } from './apis';


// Create a new booking
export const useCreateBooking = () => {
  return useMutation<BookingDTO, unknown, CreateBookingPayload>({
    mutationFn: createBooking,
    onSuccess: () => {
      // Optional: Invalidate related queries (e.g., user bookings, room availability)
      // Example: queryClient.invalidateQueries({ queryKey: ['userBookings'] });
      // For now, no automatic invalidation unless you define dependent queries
    },
  });
};