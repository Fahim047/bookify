import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { useParams } from 'react-router-dom';

function Reservations() {
	const { hotelId } = useParams();
	const { data: bookings } = useQuery('fetchBookingsByHotelId', () =>
		apiClient.fetchBookingsByHotelId(hotelId || '')
	);
	// console.log(bookings);

	if (!bookings || bookings.length === 0) {
		return <span>No bookings found</span>;
	}

	return (
		// <div className="max-w-4xl mx-auto mt-8">
		// 	<h2 className="text-2xl font-semibold mb-4">Room Bookings</h2>
		// 	<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		// 		{bookings.map((booking, index) => (
		// 			<div
		// 				key={index}
		// 				className="bg-white rounded-lg shadow-md p-4"
		// 			>
		// 				<p className="text-lg font-semibold mb-2">
		// 					{`${booking.firstName} ${booking.lastName}`}
		// 				</p>
		// 				<p className="text-gray-600 mb-2">
		// 					Phone: {booking.phoneNumber}
		// 				</p>
		// 				<p className="text-gray-600 mb-2">
		// 					Room Booked: {booking.roomId.roomNumber}
		// 				</p>
		// 				<p className="text-gray-600 mb-2">
		// 					Check-in: {new Date(booking.checkIn).toDateString()}
		// 				</p>
		// 				<p className="text-gray-600 mb-2">
		// 					Check-out:{' '}
		// 					{new Date(booking.checkOut).toDateString()}
		// 				</p>
		// 			</div>
		// 		))}
		// 	</div>
		// 	{bookings.length === 0 && (
		// 		<p className="text-gray-600 text-center mt-4">
		// 			No bookings available.
		// 		</p>
		// 	)}
		// </div>
		<div className="max-w-4xl mx-auto mt-8">
			<h2 className="text-2xl font-semibold mb-4">Room Bookings</h2>
			{bookings.length > 0 ? (
				<table className="w-full border-collapse border border-gray-200">
					<thead>
						<tr className="bg-gray-100">
							<th className="border border-gray-200 px-4 py-2">
								Name
							</th>
							<th className="border border-gray-200 px-4 py-2">
								Phone
							</th>
							<th className="border border-gray-200 px-4 py-2">
								Room Booked
							</th>
							<th className="border border-gray-200 px-4 py-2">
								Check-in
							</th>
							<th className="border border-gray-200 px-4 py-2">
								Check-out
							</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map((booking, index) => (
							<tr
								key={index}
								className={
									index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
								}
							>
								<td className="border border-gray-200 px-4 py-2">{`${booking.firstName} ${booking.lastName}`}</td>
								<td className="border border-gray-200 px-4 py-2">
									{booking.phoneNumber}
								</td>
								<td className="border border-gray-200 px-4 py-2">
									{booking.roomId.roomNumber}
								</td>
								<td className="border border-gray-200 px-4 py-2">
									{new Date(booking.checkIn).toDateString()}
								</td>
								<td className="border border-gray-200 px-4 py-2">
									{new Date(booking.checkOut).toDateString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="text-gray-600 text-center mt-4">
					No bookings available.
				</p>
			)}
		</div>
	);
}

export default Reservations;
