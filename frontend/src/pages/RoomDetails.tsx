import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm';

const RoomDetails = () => {
	const { roomId } = useParams();
	const { data: room } = useQuery(
		'fetchRoomById',
		() => apiClient.fetchRoomById(roomId || ''),
		{
			enabled: !!roomId,
		}
	);

	if (!room) {
		return <></>;
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">{room.roomNumber}</h1>
				<div className="text-xl font-semibold text-gray-600">
					{room.pricePerNight}
					<span className="inline-block px-1 text-3xl">&#2547;</span>/
					Night
				</div>
			</div>
			<div className="flex flex-col">
				<div className="mb-6">
					{room.imageUrls.map((image, index) => (
						<div key={index} className="h-[400px]">
							<img
								src={image}
								alt={room.roomNumber}
								className="rounded-md w-full h-full object-cover object-center"
							/>
						</div>
					))}
				</div>
				<div className="flex flex-wrap gap-2">
					{room.facilities.map((facility, index) => (
						<span
							key={index}
							className="inline-block px-3 py-1 text-xs font-medium bg-orange-300 text-gray-700 rounded-full shadow-sm"
						>
							{facility}
						</span>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
				<div className="whitespace-pre-line text-gray-700">
					{room.description}
				</div>
				<div>
					<GuestInfoForm
						pricePerNight={room.pricePerNight}
						room={room}
					/>
				</div>
			</div>
		</div>
	);
};

export default RoomDetails;
