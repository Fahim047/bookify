import { useQuery } from 'react-query';
import RoomCard from '../forms/ManageHotelForm/RoomCard';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
const HotelRooms = ({ hotelId }: { hotelId: string }) => {
	const { data: rooms } = useQuery('fetchQuery', () =>
		apiClient.fetchRoomsByHotelId(hotelId || '')
	);
	return (
		<>
			<div>
				<h1 className="text-3xl font-bold mb-4">Hotel Rooms</h1>
				<div className="flex gap-4 flex-wrap justify-center items-center">
					{rooms?.map((room) => (
						<div className="border border-slate-300 rounded-lg p-5">
							<Link to={`/room-detail/${room._id}`}>
								<RoomCard key={room._id} room={room} />
							</Link>
							<div className="flex justify-between gap-2">
								<span className="inline-block bg-blue-500 text-white py-1 px-2 rounded-md text-md font-semibold">
									{room.type}
								</span>
								<span className="inline-block bg-green-500 text-white py-1 px-2 rounded-md text-md font-semibold">
									<span>{room.pricePerNight}</span>
									<span className="inline-block px-1">
										&#2547;
									</span>
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default HotelRooms;
