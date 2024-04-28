import { useQuery } from 'react-query';
import RoomCard from '../forms/ManageHotelForm/RoomCard';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
const HotelRooms = ({ hotelId }: { hotelId: string }) => {
	const { data: rooms } = useQuery('fetchQuery', () =>
		apiClient.fetchRoomsByHotelId(hotelId)
	);
	return (
		<>
			<div>
				<span className="flex justify-between">
					<h1 className="text-3xl font-bold">Hotel Rooms</h1>
				</span>
				<div className="flex gap-4 flex-wrap justify-center items-center">
					{rooms?.map((room) => (
						<Link to={`/room-detail/${room._id}`}>
							<RoomCard key={room._id} room={room} />
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default HotelRooms;
