export type UserType = {
	_id: string;
	email: string;
	phoneNumber: string;
	password: string;
	firstName: string;
	lastName: string;
};

export type RoomType = {
	_id: string;
	hotelId: string;
	roomNumber: string;
	type: string;
	description: string;
	adultCount: number;
	childCount: number;
	facilities: string[];
	pricePerNight: number;
	imageUrls: string[];
	bookings: BookingType[];
};

export type HotelType = {
	_id: string;
	userId: string;
	name: string;
	city: string;
	country: string;
	description: string;
	type: string;
	adultCount: number;
	childCount: number;
	facilities: string[];
	pricePerNight: number;
	starRating: number;
	imageUrls: string[];
	lastUpdated: Date;
	rooms: RoomType[];
	bookings: BookingType[];
};

export type BookingType = {
	_id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	adultCount: number;
	childCount: number;
	checkIn: Date;
	checkOut: Date;
	totalCost: number;
	roomId: string;
	hotelId: string;
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
