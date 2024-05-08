import { useForm } from 'react-hook-form';
import {
	HotelType,
	RoomType,
	UserType,
} from '../../../../backend/src/shared/types';
import { useSearchContext } from '../../contexts/SearchContext';
import { useParams } from 'react-router-dom';
// import { useMutation } from 'react-query';
// import * as apiClient from '../../api-client';
// import { useAppContext } from '../../contexts/AppContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

type Props = {
	currentUser: UserType;
	hotel: HotelType;
	room: RoomType;
	numberOfNights: number;
};

export type BookingFormData = {
	firstName: string;
	lastName: string;
	email: string;
	checkIn: Date;
	checkOut: Date;
	hotelId: string;
	roomId: string;
	userId: string;
	totalCost: number;
	phoneNumber: string;
	numberOfNights: number;
};

const BookingForm = ({ currentUser, room, numberOfNights }: Props) => {
	const search = useSearchContext();
	const { hotelId, roomId } = useParams();

	// const { showToast } = useAppContext();

	// const { mutate: bookRoom, isLoading } = useMutation(
	// apiClient.createRoomBooking,
	// 	{
	// 		onSuccess: () => {
	// 			showToast({ message: 'Booking Saved!', type: 'SUCCESS' });
	// 		},
	// 		onError: () => {
	// 			showToast({ message: 'Error saving booking', type: 'ERROR' });
	// 		},
	// 	}
	// );

	const { handleSubmit, register } = useForm<BookingFormData>({
		defaultValues: {
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
			email: currentUser.email,
			phoneNumber: currentUser.phoneNumber,
			checkIn: search.checkIn,
			checkOut: search.checkOut,
			hotelId: hotelId,
			roomId: roomId,
			userId: currentUser._id,
			totalCost: numberOfNights * room.pricePerNight,
			numberOfNights: numberOfNights,
		},
	});

	const onSubmit = async (formData: BookingFormData) => {
		console.log(formData);
		// bookRoom({ ...formData, numberOfNights: numberOfNights });

		fetch(
			`${API_BASE_URL}/api/rooms/${formData.hotelId}/bookings/${formData.roomId}/book-now`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			}
		)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				window.location.replace(result.url);
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
		>
			<span className="text-3xl font-bold">Confirm Your Details</span>
			<div className="grid grid-cols-2 gap-6">
				<label className="text-gray-700 text-sm font-bold flex-1">
					First Name
					<input
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
						type="text"
						readOnly
						disabled
						{...register('firstName')}
					/>
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Last Name
					<input
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
						type="text"
						readOnly
						disabled
						{...register('lastName')}
					/>
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Email
					<input
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
						type="text"
						readOnly
						disabled
						{...register('email')}
					/>
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Phone
					<input
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
						type="text"
						readOnly
						disabled
						{...register('phoneNumber')}
					/>
				</label>
			</div>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Your Price Summary</h2>

				<div className="bg-blue-200 p-4 rounded-md">
					<div className="font-semibold text-lg">
						Total Cost:{' '}
						<span className="inline-block px-1 text-2xl">
							&#2547;
						</span>{' '}
						{room.pricePerNight * numberOfNights}
					</div>
					<div className="text-xs">Includes taxes and charges</div>
				</div>
			</div>

			<div className="flex justify-end">
				<button
					// disabled={isLoading}
					type="submit"
					className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
				>
					{/* {isLoading ? 'Saving...' : 'Confirm Booking'}
					 */}
					Continue
				</button>
			</div>
		</form>
	);
};

export default BookingForm;
