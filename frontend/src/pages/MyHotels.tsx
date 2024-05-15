import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MyHotels = () => {
	const { data: hotelData } = useQuery(
		'fetchMyHotels',
		apiClient.fetchMyHotels,
		{
			onError: () => {},
		}
	);

	if (!hotelData) {
		return <span>No Hotels found</span>;
	}

	return (
		<div className="space-y-5">
			<span className="flex justify-between">
				<h1 className="text-3xl font-bold">My Hotels</h1>
				<Link
					to="/add-hotel"
					className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
				>
					Add Hotel
				</Link>
			</span>
			<div className="grid grid-cols-1 gap-8">
				{hotelData.map((hotel) => (
					<div
						key={hotel._id}
						data-testid="hotel-card"
						className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
					>
						<h2 className="text-2xl font-bold">{hotel.name}</h2>
						<div className="whitespace-pre-line">
							{hotel.description}
						</div>
						<div className="grid grid-cols-5 gap-2">
							<div className="flex justify-center items-center bg-lime-600 text-white py-1 px-2 rounded-md">
								<FaMapMarkerAlt className="mr-1" />
								<span>{hotel.city}</span>
							</div>
						</div>
						<span className="flex justify-end gap-2">
							<Link
								to={`/${hotel._id}/hotel-reservations`}
								className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
							>
								Reservations
							</Link>
							<Link
								to={`/edit-hotel/${hotel._id}`}
								className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
							>
								Edit
							</Link>
							<Link
								to={`/edit-hotel/${hotel._id}/rooms`}
								className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
							>
								View Rooms
							</Link>
							<Link
								to={`/detail/${hotel._id}`}
								className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
							>
								View As Guest
							</Link>
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyHotels;
