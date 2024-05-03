import { useQuery } from 'react-query';
import RoomCard from '../forms/ManageHotelForm/RoomCard';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';

type Props = {
	hotelId: string;
};
const HotelRooms = ({ hotelId }: Props) => {
	const { data: rooms } = useQuery('fetchRoomByHotelId', () =>
		apiClient.fetchRoomsByHotelId(hotelId || '')
	);
	return (
		<>
			<div>
				<h1 className="text-3xl font-bold mb-4">Hotel Rooms</h1>
				<div className="flex gap-4 flex-wrap justify-center items-center">
					{rooms?.map((room) => (
						<Link key={room._id} to={`/room-detail/${room._id}`}>
							<div className="border border-slate-300 rounded-lg p-5">
								<RoomCard room={room} />
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
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default HotelRooms;
