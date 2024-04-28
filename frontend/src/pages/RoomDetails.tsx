import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import { AiFillStar } from 'react-icons/ai';
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm';

const RoomDetails = () => {
	const { roomId } = useParams();
	console.log(roomId);
	const { data: room } = useQuery(
		'fetchRoomById',
		() => apiClient.fetchRoomById(roomId || ''),
		{
			enabled: !!roomId,
		}
	);
	console.log(room);

	if (!room) {
		return <></>;
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold">{room.roomNumber}</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{room.imageUrls.map((image) => (
					<div className="w-full">
						<img
							src={image}
							alt={room.roomNumber}
							className="rounded-md w-full h-full object-cover object-center"
						/>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
				{room.facilities.map((facility) => (
					<div className="border border-slate-300 rounded-sm p-3">
						{facility}
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
				<div className="whitespace-pre-line">{room.description}</div>
				<div className="h-fit">
					<GuestInfoForm
						pricePerNight={room.pricePerNight}
						roomId={room._id}
					/>
				</div>
			</div>
		</div>
	);
};

export default RoomDetails;
