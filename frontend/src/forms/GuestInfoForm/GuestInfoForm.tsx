import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useSearchContext } from '../../contexts/SearchContext';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoomType } from '../../../../backend/src/shared/types';
type Props = {
	room: RoomType;
	pricePerNight: number;
};

type GuestInfoFormData = {
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
};

const GuestInfoForm = ({ room, pricePerNight }: Props) => {
	const search = useSearchContext();
	const { isLoggedIn } = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		watch,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<GuestInfoFormData>({
		defaultValues: {
			checkIn: search.checkIn,
			checkOut: search.checkOut,
			adultCount: search.adultCount,
			childCount: search.childCount,
		},
	});

	const checkIn = watch('checkIn');
	const checkOut = watch('checkOut');

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	const onSignInClick = (data: GuestInfoFormData) => {
		search.saveSearchValues(
			'',
			data.checkIn,
			data.checkOut,
			data.adultCount,
			data.childCount
		);
		navigate('/sign-in', { state: { from: location } });
	};

	const onSubmit = (data: GuestInfoFormData) => {
		search.saveSearchValues(
			'',
			data.checkIn,
			data.checkOut,
			data.adultCount,
			data.childCount
		);
		navigate(`/hotel/${room.hotelId}/booking/${room._id}`);
	};

	return (
		<div className="flex flex-col p-6 bg-blue-200 rounded-lg shadow-md">
			<h3 className="text-lg font-bold mb-4">Book your next stay</h3>
			<h4 className="text-md font-bold">Price: £{pricePerNight}</h4>
			<form
				onSubmit={
					isLoggedIn
						? handleSubmit(onSubmit)
						: handleSubmit(onSignInClick)
				}
				className="mt-4"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="checkIn"
							className="block text-sm font-semibold text-gray-700 mb-1"
						>
							Check-in Date
						</label>
						<DatePicker
							required
							selected={checkIn}
							onChange={(date) =>
								setValue('checkIn', date as Date)
							}
							selectsStart
							startDate={checkIn}
							endDate={checkOut}
							minDate={minDate}
							maxDate={maxDate}
							placeholderText="Select Check-in Date"
							className="w-full bg-white p-2 rounded focus:outline-none"
						/>
					</div>
					<div>
						<label
							htmlFor="checkOut"
							className="block text-sm font-semibold text-gray-700 mb-1"
						>
							Check-out Date
						</label>
						<DatePicker
							required
							selected={checkOut}
							onChange={(date) =>
								setValue('checkOut', date as Date)
							}
							selectsEnd
							startDate={checkIn}
							endDate={checkOut}
							minDate={minDate}
							maxDate={maxDate}
							placeholderText="Select Check-out Date"
							className="w-full bg-white p-2 rounded focus:outline-none"
						/>
					</div>
				</div>
				<div className="flex gap-4 mt-4">
					<div className="w-1/2">
						<label
							htmlFor="adultCount"
							className="block text-sm font-semibold text-gray-700 mb-1"
						>
							Adults
						</label>
						<input
							id="adultCount"
							type="number"
							min={1}
							max={20}
							className="w-full p-2 border rounded focus:outline-none"
							{...register('adultCount', {
								required: 'Please enter number of adults',
								min: {
									value: 1,
									message: 'At least one adult is required',
								},
								valueAsNumber: true,
							})}
						/>
						{errors.adultCount && (
							<span className="text-red-500 text-sm">
								{errors.adultCount.message}
							</span>
						)}
					</div>
					<div className="w-1/2">
						<label
							htmlFor="childCount"
							className="block text-sm font-semibold text-gray-700 mb-1"
						>
							Children
						</label>
						<input
							id="childCount"
							type="number"
							min={0}
							max={20}
							className="w-full p-2 border rounded focus:outline-none"
							{...register('childCount', { valueAsNumber: true })}
						/>
					</div>
				</div>
				<button
					type="submit"
					className="bg-blue-600 text-white py-2 px-4 rounded-full font-semibold text-lg hover:bg-blue-500 focus:outline-none mt-6 w-full"
				>
					{isLoggedIn ? 'Book Now' : 'Sign in to Book'}
				</button>
			</form>
		</div>
	);
};

export default GuestInfoForm;
