import { useQuery } from '@tanstack/react-query';
import { getAllBookings, getHistoryBookings } from '../utils/apiBooking';
export const useHistoryBookings = (user) => {
    const queryFn = user.role === 'Admin' ? getAllBookings : () => getHistoryBookings(user.data.user_id);
  return useQuery({
    queryKey: ['bookingHistory', user.role === 'Admin' ? 'all' : user.data.user_id],
    queryFn,
    enabled: !!user,
  });
};
