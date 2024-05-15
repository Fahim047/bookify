import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { Link } from 'react-router-dom';

const MyBookings = () => {
	const { data: bookings } = useQuery(
		'fetchMyBookings',
		apiClient.fetchMyBookings
	);
	// console.log(bookings);

	if (!bookings || bookings.length === 0) {
		return <span>No bookings found</span>;
	}

	return (
		<div className="space-y-5">
			<h1 className="text-3xl font-bold">My Bookings</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2  border border-slate-300 rounded-lg p-8 gap-5">
				{bookings.map((booking) => (
					<div
						key={booking._id}
						className="border border-gray-200 shadow-2xl p-3 rounded-lg "
					>
						<div className="">
							<img
								src={booking.hotelId.imageUrls[0]}
								className="w-full max-h-[300px] object-cover object-center rounded-lg"
							/>
						</div>

						<div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
							<div className="text-2xl font-bold ">
								{booking.hotelId.name}

								<div className="text-xs font-normal">
									{booking.hotelId.city},{' '}
									{booking.hotelId.country}
								</div>
							</div>
							<div className="">
								<p>
									Check-in:{' '}
									{new Date(booking.checkIn).toDateString()}
								</p>
								<p>
									Check-out:{' '}
									{new Date(booking.checkOut).toDateString()}
								</p>
								<p>Room Number: {booking.roomId.roomNumber}</p>
								<p>
									Payment Status :{' '}
									{booking.paymentStatus == true ? (
										<span className="px-4 bg-green-500 rounded-lg">
											Paid
										</span>
									) : (
										<span className="bg-red-500">
											Not Paid
										</span>
									)}
								</p>
							</div>
						</div>
						<div className="flex justify-end mt-5">
							<Link to={`/detail/${booking.hotelId._id}`}>
								<button className="bg-blue-600 text-white  p-2 font-bold  rounded-lg hover:bg-blue-500  gap-2">
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
