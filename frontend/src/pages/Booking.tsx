import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import BookingForm from '../forms/BookingForm/BookingForm';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';

const Booking = () => {
	const { stripePromise } = useAppContext();
	const search = useSearchContext();
	const { hotelId, roomId } = useParams();

	const [numberOfNights, setNumberOfNights] = useState<number>(0);

	useEffect(() => {
		if (search.checkIn && search.checkOut) {
			const nights =
				Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
				(1000 * 60 * 60 * 24);

			setNumberOfNights(Math.ceil(nights));
		}
	}, [search.checkIn, search.checkOut]);

	const { data: paymentIntentData } = useQuery(
		'createPaymentIntent',
		() =>
			apiClient.createPaymentIntent(
				roomId as string,
				numberOfNights.toString()
			),
		{
			enabled: !!roomId && numberOfNights > 0,
		}
	);

	const { data: hotel } = useQuery(
		'fetchHotelByID',
		() => apiClient.fetchHotelById(hotelId as string),
		{
			enabled: !!hotelId,
		}
	);
	const { data: room } = useQuery(
		'fetchRoomByID',
		() => apiClient.fetchRoomById(roomId as string),
		{
			enabled: !!roomId,
		}
	);

	const { data: currentUser } = useQuery(
		'fetchCurrentUser',
		apiClient.fetchCurrentUser
	);

	if (!room) {
		return <></>;
	}

	return (
		<div className="grid md:grid-cols-[1fr_2fr]">
			<BookingDetailsSummary
				checkIn={search.checkIn}
				checkOut={search.checkOut}
				numberOfNights={numberOfNights}
				hotel={hotel}
				room={room}
			/>
			{currentUser && paymentIntentData && (
				<Elements
					stripe={stripePromise}
					options={{
						clientSecret: paymentIntentData.clientSecret,
					}}
				>
					<BookingForm
						currentUser={currentUser}
						paymentIntent={paymentIntentData}
					/>
				</Elements>
			)}
		</div>
	);
};

export default Booking;
