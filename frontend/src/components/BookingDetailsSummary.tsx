import { HotelType, RoomType } from '../../../backend/src/shared/types';

type Props = {
	checkIn: Date;
	checkOut: Date;
	numberOfNights: number;
	hotel?: HotelType;
	room?: RoomType;
};

const BookingDetailsSummary = ({
	checkIn,
	checkOut,
	numberOfNights,
	hotel,
	room,
}: Props) => {
	return (
		<div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
			<h2 className="text-xl font-bold">Your Booking Details</h2>

			<div className="border-b py-2">
				Hotel Name: &nbsp;
				<span className="font-bold">{`${hotel?.name}`}</span>
			</div>
			<div className="border-b py-2">
				Room Number: &nbsp;
				<span className="font-bold">{`${room?.roomNumber}`}</span>
			</div>
			<div className="flex justify-between">
				<div>
					Check-in
					<div className="font-bold"> {checkIn.toDateString()}</div>
				</div>
				<div>
					Check-out
					<div className="font-bold"> {checkOut.toDateString()}</div>
				</div>
			</div>
			<div className="border-t border-b py-2">
				Total length of stay:
				<div className="font-bold">{numberOfNights} nights</div>
			</div>
		</div>
	);
};

export default BookingDetailsSummary;
