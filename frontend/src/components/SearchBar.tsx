import { FormEvent, useState } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
	const navigate = useNavigate();
	const search = useSearchContext();

	const [destination, setDestination] = useState<string>(search.destination);
	const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
	const [checkOut, setCheckOut] = useState<Date>(search.checkOut);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		search.saveSearchValues(destination, checkIn, checkOut);
		navigate('/search');
	};

	const handleClear = () => {
		setDestination('');
		setCheckIn(new Date());
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		setCheckOut(tomorrow);
	};

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	return (
		<form
			onSubmit={handleSubmit}
			className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center gap-4"
		>
			<div className="flex items-center bg-white p-2">
				<MdTravelExplore size={25} className="mr-2 text-orange-400" />
				<input
					placeholder="Where are you going?"
					className="text-md w-full focus:outline-none bg-transparent"
					value={destination}
					onChange={(event) => setDestination(event.target.value)}
				/>
			</div>
			{/* <div className="flex justify-between">
				<DatePicker
					selected={checkIn}
					onChange={(date) => setCheckIn(date as Date)}
					selectsStart
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
					dateFormat="dd/MM/yyyy"
					placeholderText="Check-in Date"
					className="w-full p-2 focus:outline-none bg-white text-gray-600 font-bold"
				/>
			</div>
			<div className="flex">
				<DatePicker
					selected={checkOut}
					onChange={(date) => setCheckOut(date as Date)}
					selectsEnd
					startDate={checkIn}
					endDate={checkOut}
					minDate={checkIn}
					maxDate={maxDate}
					dateFormat="dd/MM/yyyy"
					placeholderText="Check-out Date"
					className="w-full p-2 focus:outline-none bg-white text-gray-600 font-bold"
				/>
			</div> */}
			<div className="flex gap-3 justify-end w-full">
				<button className="w-full bg-blue-600 text-white h-full p-2 font-bold text-lg hover:bg-blue-500 rounded">
					Search
				</button>
				<button
					type="button"
					className="w-full bg-red-600 text-white h-full p-2 font-bold text-lg hover:bg-red-500 rounded"
					onClick={handleClear}
				>
					Clear
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
