export type UserType = {
	_id: string;
	email: string;
	phoneNumber: string;
	password: string;
	firstName: string;
	lastName: string;
};

export type DateRange = {
	checkIn: Date;
	checkOut: Date;
};

export type RoomType = {
	_id: string;
	hotelId: string;
	roomNumber: string;
	type: string;
	description: string;
	facilities: string[];
	pricePerNight: number;
	imageUrls: string[];
	bookings: BookingType[];
	alreadyBooked: DateRange[];
};

export type HotelType = {
	_id: string;
	userId: string;
	name: string;
	city: string;
	country: string;
	contactNumber: string;
	description: string;
	imageUrls: string[];
	lastUpdated: Date;
	rooms: RoomType[];
};

export type BookingType = {
	_id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	checkIn: Date;
	checkOut: Date;
	totalCost: number;
	roomId: RoomType;
	hotelId: HotelType;
	transactionId: string;
	paymentStatus: boolean;
};
export type BookingWithHotelType = {
	_id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	checkIn: Date;
	checkOut: Date;
	totalCost: number;
	roomId: RoomType;
	hotelId: HotelType;
	transactionId: string;
	paymentStatus: boolean;
};

export type HotelSearchResponse = {
	data: HotelType[];
	pagination: {
		total: number;
		page: number;
		pages: number;
	};
};

export type PaymentIntentResponse = {
	paymentIntentId: string;
	clientSecret: string;
	totalCost: number;
};
