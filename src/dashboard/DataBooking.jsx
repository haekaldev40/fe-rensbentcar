// import { nanoid } from "nanoid";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useHistoryBookings } from "../hooks/useBooking";

// export function DataBooking() {
//   const { user } = useAuthContext();
//   const { data: bookingHistory, isLoading, error } = useHistoryBookings(user);

//   const formatRupiah = (number) => {
//     if (number == null) return "Rp 0";
//     return number.toLocaleString("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     });
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-1 gap-4 ">
//         <table className="">
//           <thead className="text-left p-2">
//             <tr className="font-mono">
//               <th className="p-2 text-sm font-semibold">Customer</th>
//               <th className="p-2 text-sm font-semibold">Mobil</th>
//               <th className="p-2 text-sm font-semibold">Date</th>
              
//             </tr>
//           </thead>
//           <tbody className="">
//             {bookingHistory.map((booking) => (
//               <tr
//                 className="font-mono border-b text-sm"
//                 key={booking.booking_id}
//               >
//                 <td className="p-2">{booking.user.name}</td>
//                 <td className="p-2">{booking.car.title}</td>
//                 <td className="p-2">
//                   {new Date(booking.start_date).toLocaleDateString()} -{" "}
//                   {new Date(booking.end_date).toLocaleDateString()}{" "}
//                 </td>
                
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
