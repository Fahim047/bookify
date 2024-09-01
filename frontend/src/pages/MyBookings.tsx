import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { Link } from 'react-router-dom';

const MyBookings = () => {
	const { data: bookings } = useQuery(
		'fetchMyBookings',
		apiClient.fetchMyBookings
	);

	if (!bookings || bookings.length === 0) {
		return (
			<div className="text-center space-y-4">
				<h2 className="text-2xl">No bookings found</h2>
				<p className="text-gray-600">
					You haven't made any bookings yet. Explore hotels and book
					your stay.
				</p>
				<Link
					to="/hotels"
					className="inline-block bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-blue-500"
				>
					Explore Hotels
				</Link>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<h1 className="text-4xl font-bold text-center">My Bookings</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{bookings.map((booking) => (
					<div
						key={booking._id}
						className="border border-gray-200 shadow-md rounded-lg overflow-hidden"
					>
						<img
							src={booking.hotelId.imageUrls[0]}
							alt={`Image of ${booking.hotelId.name}`}
							className="w-full h-48 object-cover"
						/>

						<div className="p-5 space-y-4">
							<h2 className="text-2xl font-bold">
								{booking.hotelId.name}
							</h2>
							<p className="text-gray-700">
								{booking.hotelId.city},{' '}
								{booking.hotelId.country}
							</p>

							<div className="space-y-2 text-sm text-gray-600">
								<p>
									<strong>Check-in:</strong>{' '}
									{new Date(
										booking.checkIn
									).toLocaleDateString()}
								</p>
								<p>
									<strong>Check-out:</strong>{' '}
									{new Date(
										booking.checkOut
									).toLocaleDateString()}
								</p>
								<p>
									<strong>Room Number:</strong>{' '}
									{booking.roomId.roomNumber}
								</p>
								<p>
									<strong>Payment Status:</strong>{' '}
									<span
										className={`inline-block px-2 py-1 rounded-md ${
											booking.paymentStatus
												? 'bg-green-100 text-green-800'
												: 'bg-red-100 text-red-800'
										}`}
									>
										{booking.paymentStatus
											? 'Paid'
											: 'Not Paid'}
									</span>
								</p>
							</div>
						</div>
						<div className="bg-gray-100 px-5 py-3 text-right">
							<Link to={`/detail/${booking.hotelId._id}`}>
								<button className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-md hover:bg-blue-500 transition duration-300">
									See Hotel Details
								</button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyBookings;
