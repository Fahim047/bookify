import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import { AiFillStar } from 'react-icons/ai';
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
			<div className="flex items-center">
				{[...Array(hotel.starRating)].map((_, index) => (
					<AiFillStar key={index} className="fill-yellow-400" />
				))}
				<h1 className="text-3xl font-bold ml-2">{hotel.name}</h1>
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

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
				{hotel.facilities.map((facility, index) => (
					<div
						key={index}
						className="border border-slate-300 rounded-sm p-3"
					>
						{facility}
					</div>
				))}
			</div>

			<div>
				<HotelRooms hotelId={hotel._id} />
			</div>
		</div>
	);
};

export default HotelDetails;
