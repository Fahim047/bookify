function Reservations() {
	const bookings = [
		{
			userName: 'John Doe',
			phoneNumber: '123-456-7890',
			roomName: 'Deluxe Room',
			checkIn: '2024-06-01',
			checkOut: '2024-06-05',
		},
		{
			userName: 'Jane Smith',
			phoneNumber: '987-654-3210',
			roomName: 'Suite Room',
			checkIn: '2024-06-10',
			checkOut: '2024-06-15',
		},
		{
			userName: 'Alice Johnson',
			phoneNumber: '555-555-5555',
			roomName: 'Standard Room',
			checkIn: '2024-07-01',
			checkOut: '2024-07-05',
		},
		{
			userName: 'Alice Johnson',
			phoneNumber: '555-555-5555',
			roomName: 'Standard Room',
			checkIn: '2024-07-01',
			checkOut: '2024-07-05',
		},
		{
			userName: 'Alice Johnson',
			phoneNumber: '555-555-5555',
			roomName: 'Standard Room',
			checkIn: '2024-07-01',
			checkOut: '2024-07-05',
		},
	];
	return (
		<div className="max-w-4xl mx-auto mt-8">
			<h2 className="text-2xl font-semibold mb-4">Room Bookings</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{bookings.map((booking, index) => (
					<div
						key={index}
						className="bg-white rounded-lg shadow-md p-4"
					>
						<p className="text-lg font-semibold mb-2">
							{booking.userName}
						</p>
						<p className="text-gray-600 mb-2">
							Phone: {booking.phoneNumber}
						</p>
						<p className="text-gray-600 mb-2">
							Room Booked: {booking.roomName}
						</p>
						<p className="text-gray-600 mb-2">
							Check-in: {booking.checkIn}
						</p>
						<p className="text-gray-600 mb-2">
							Check-out: {booking.checkOut}
						</p>
					</div>
				))}
			</div>
			{bookings.length === 0 && (
				<p className="text-gray-600 text-center mt-4">
					No bookings available.
				</p>
			)}
		</div>
	);
}

export default Reservations;
