import React, { useContext, useState } from 'react';

type SearchContext = {
	destination: string;
	checkIn: Date;
	checkOut: Date;
	hotelId: string;
	phoneNumber: string;
	saveSearchValues: (
		destination: string,
		checkIn: Date,
		checkOut: Date
	) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
	children: React.ReactNode;
};

export const SearchContextProvider = ({
	children,
}: SearchContextProviderProps) => {
	const [destination, setDestination] = useState<string>(
		() => sessionStorage.getItem('destination') || ''
	);
	const [checkIn, setCheckIn] = useState<Date>(
		() =>
			new Date(
				sessionStorage.getItem('checkIn') || new Date().toISOString()
			)
	);
	const [checkOut, setCheckOut] = useState<Date>(
		() =>
			new Date(
				sessionStorage.getItem('checkOut') || new Date().toISOString()
			)
	);

	const [hotelId, setHotelId] = useState<string>(
		() => sessionStorage.getItem('hotelID') || ''
	);
	const [phoneNumber, setPhoneNumber] = useState<string>(
		() => sessionStorage.getItem('phoneNumber') || ''
	);

	const saveSearchValues = (
		destination: string,
		checkIn: Date,
		checkOut: Date,
		hotelId?: string
	) => {
		setDestination(destination);
		setCheckIn(checkIn);
		setCheckOut(checkOut);
		setPhoneNumber(phoneNumber);
		if (hotelId) {
			setHotelId(hotelId);
		}

		sessionStorage.setItem('destination', destination);
		sessionStorage.setItem('phoneNumber', phoneNumber);
		sessionStorage.setItem('checkIn', checkIn.toISOString());
		sessionStorage.setItem('checkOut', checkOut.toISOString());

		if (hotelId) {
			sessionStorage.setItem('hotelId', hotelId);
		}
	};

	return (
		<SearchContext.Provider
			value={{
				destination,
				checkIn,
				checkOut,
				hotelId,
				saveSearchValues,
				phoneNumber,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	return context as SearchContext;
};
