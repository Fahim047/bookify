import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useSearchContext } from '../../contexts/SearchContext';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoomType } from '../../../../backend/src/shared/types';
import { addDays, isWithinInterval, parseISO, subDays } from 'date-fns';
type Props = {
	room: RoomType;
	pricePerNight: number;
};

type GuestInfoFormData = {
	checkIn: Date;
	checkOut: Date;
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
		},
	});

	const checkIn = watch('checkIn');
	const checkOut = watch('checkOut');

	// console.log(new Date());

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	const onSignInClick = (data: GuestInfoFormData) => {
		search.saveSearchValues('', data.checkIn, data.checkOut);
		navigate('/sign-in', { state: { from: location } });
	};

	const onSubmit = (data: GuestInfoFormData) => {
		search.saveSearchValues('', data.checkIn, data.checkOut);
		navigate(`/hotel/${room.hotelId}/booking/${room._id}`);
	};

	const alreadyBookedDates = room.alreadyBooked.map((dateRange) => {
		return {
			start: subDays(new Date(dateRange.checkIn), 1),
			end: subDays(new Date(dateRange.checkOut), 1),
		};
	});

	return (
		<div className="flex flex-col p-6 bg-blue-200 rounded-lg shadow-md">
			<h3 className="text-lg font-bold mb-4">Book your next stay</h3>
			<h4 className="text-md font-bold">
				Price:{' '}
				<span className="inline-block text-bold text-lg">&#2547;</span>
				&nbsp;
				{pricePerNight}
			</h4>
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
							excludeDateIntervals={alreadyBookedDates}
							maxDate={maxDate}
							dateFormat="dd/MM/yyyy"
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
							excludeDateIntervals={alreadyBookedDates}
							startDate={checkIn}
							endDate={checkOut}
							minDate={minDate}
							maxDate={maxDate}
							dateFormat="dd/MM/yyyy"
							placeholderText="Select Check-out Date"
							className="w-full bg-white p-2 rounded focus:outline-none"
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
