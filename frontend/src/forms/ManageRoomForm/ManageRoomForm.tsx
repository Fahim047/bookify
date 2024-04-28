import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';
import { RoomType } from '../../../../backend/src/shared/types';
import { useEffect } from 'react';

export type RoomFormData = {
	roomNumber: string;
	description: string;
	type: string;
	pricePerNight: number;
	facilities: string[];
	imageFiles: FileList;
	imageUrls: string[];
	adultCount: number;
	childCount: number;
};

type Props = {
	room?: RoomType;
	hotelId: string;
	onSave: (roomFormData: FormData) => void;
	isLoading: boolean;
};

const ManageRoomForm = ({ onSave, isLoading, room, hotelId }: Props) => {
	const formMethods = useForm<RoomFormData>();
	const { handleSubmit, reset } = formMethods;

	useEffect(() => {
		reset(room);
	}, [room, reset]);

	const onSubmit = handleSubmit((formDataJson: RoomFormData) => {
		const formData = new FormData();
		if (room) {
			formData.append('roomId', room._id);
		}
		formData.append('hotelId', hotelId);
		formData.append('roomNumber', formDataJson.roomNumber);
		formData.append('description', formDataJson.description);
		formData.append('type', formDataJson.type);
		formData.append('pricePerNight', formDataJson.pricePerNight.toString());
		formData.append('adultCount', formDataJson.adultCount.toString());
		formData.append('childCount', formDataJson.childCount.toString());

		formDataJson.facilities.forEach((facility, index) => {
			formData.append(`facilities[${index}]`, facility);
		});

		if (formDataJson.imageUrls) {
			formDataJson.imageUrls.forEach((url, index) => {
				formData.append(`imageUrls[${index}]`, url);
			});
		}

		Array.from(formDataJson.imageFiles).forEach((imageFile) => {
			formData.append(`imageFiles`, imageFile);
		});

		onSave(formData);
	});

	return (
		<FormProvider {...formMethods}>
			<form className="flex flex-col gap-10" onSubmit={onSubmit}>
				<DetailsSection />
				<TypeSection />
				<FacilitiesSection />
				<GuestsSection />
				<ImagesSection />
				<span className="flex justify-end">
					<button
						disabled={isLoading}
						type="submit"
						className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
					>
						{isLoading ? 'Saving...' : 'Save'}
					</button>
				</span>
			</form>
		</FormProvider>
	);
};

export default ManageRoomForm;
