import { useQuery } from 'react-query';
import RoomCard from '../forms/ManageHotelForm/RoomCard';
import { Link, useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
const HotelRooms = () => {
	const { hotelId } = useParams();
	const { data: rooms } = useQuery('fetchQuery', () =>
		apiClient.fetchRoomsByHotelId(hotelId || '')
	);
	return (
		<>
			<div>
				<span className="flex justify-between">
					<h1 className="text-3xl font-bold">Hotel Rooms</h1>
					<Link
						to={`/edit-hotel/${hotelId}/rooms/create`}
						className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
					>
						Add Room
					</Link>
				</span>
				<Link to={`/edit`}>
					<div className="flex gap-4 flex-wrap justify-center items-center">
						{rooms?.map((room) => (
							<RoomCard key={room._id} room={room} />
						))}
					</div>
				</Link>
			</div>
		</>
	);
};

export default HotelRooms;
