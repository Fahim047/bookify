import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import HotelRooms from '../pages/HotelRooms';

const HotelDetails = () => {
	const { hotelId } = useParams();

	const { data: hotel } = useQuery(
		'fetchHotelById',
		() => apiClient.fetchHotelById(hotelId || ''),
		{
			enabled: !!hotelId,
		}
	);

	if (!hotel) {
		return <></>;
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center flex-col">
				<h1 className="text-3xl font-bold ml-2 mb-2">{hotel.name}</h1>
				<span className="text-gray-400">
					{hotel.city},&nbsp;{hotel.country}
				</span>
			</div>

			<div className="mb-6">
				{hotel.imageUrls.map((image, index) => (
					<div key={index} className="h-[300px]">
						<img
							src={image}
							alt={hotel.name}
							className="rounded-md w-full h-full object-cover object-center"
						/>
					</div>
				))}
			</div>
			<div className="whitespace-pre-line text-gray-700">
				{hotel.description}
			</div>

			<div>
				<HotelRooms hotelId={hotelId || ''} />
			</div>
		</div>
	);
};

export default HotelDetails;
