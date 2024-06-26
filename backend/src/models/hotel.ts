import mongoose from 'mongoose';
import { BookingType, HotelType, RoomType } from '../shared/types';
import { ObjectId } from 'mongodb';

const bookingSchema = new mongoose.Schema<BookingType>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	phoneNumber: { type: String },
	checkIn: { type: Date, required: true },
	checkOut: { type: Date, required: true },
	userId: { type: String },
	totalCost: { type: Number, required: true },
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room', // Forward reference to Room schema
		required: true,
	},
	hotelId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hotel', // Forward reference to Hotel schema
		required: true,
	},
	transactionId: { type: String },
	paymentStatus: { type: Boolean, default: false },
});

const DateRangeSchema = new mongoose.Schema({
	checkIn: { type: Date, required: true },
	checkOut: { type: Date, required: true },
});

const roomSchema = new mongoose.Schema<RoomType>({
	hotelId: { type: String, required: true },
	roomNumber: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	facilities: [{ type: String, required: true }],
	pricePerNight: { type: Number, required: true },
	imageUrls: [{ type: String, required: true }],
	bookings: [bookingSchema],
	alreadyBooked: [DateRangeSchema],
});
const hotelSchema = new mongoose.Schema<HotelType>({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	city: { type: String, required: true },
	country: { type: String, required: true },
	description: { type: String, required: true },
	contactNumber: { type: String, required: true },
	imageUrls: [{ type: String, required: true }],
	lastUpdated: { type: Date, required: true },
	rooms: [roomSchema],
});

const Hotel = mongoose.model<HotelType>('Hotel', hotelSchema);
export const Room = mongoose.model<RoomType>('Room', roomSchema);
export const Booking = mongoose.model<BookingType>('Booking', bookingSchema);

export default Hotel;
