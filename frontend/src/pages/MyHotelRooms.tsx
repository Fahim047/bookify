import { useQuery } from 'react-query';
import RoomCard from '../forms/ManageHotelForm/RoomCard';
import { Link, useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
const MyHotelRooms = () => {
	const { hotelId } = useParams();
	const { data: rooms } = useQuery('fetchRoomByHotelId', () =>
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
				<div className="flex gap-4 flex-wrap justify-center items-center mt-6">
					{rooms?.map((room) => (
						<div className="border border-slate-300 rounded-lg p-5">
							<RoomCard key={room._id} room={room} />
							<span className="flex justify-end gap-2">
								<Link
									to={`/room-detail/${room._id}`}
									className="flex
									bg-blue-600
									text-white
									text-xl
									font-bold
									p-2
									hover:bg-blue-500"
								>
									View as Guest
								</Link>
								<Link
									to={`/edit-hotel/${hotelId}/rooms/${room._id}/edit`}
									className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
								>
									Edit
								</Link>
							</span>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default MyHotelRooms;
