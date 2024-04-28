import { useMutation } from 'react-query';
import ManageRoomForm from '../forms/ManageRoomForm/ManageRoomForm';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';
import { useParams } from 'react-router-dom';

const AddRoom = () => {
	const { hotelId } = useParams();
	console.log(hotelId);
	const { showToast } = useAppContext();

	const { mutate, isLoading } = useMutation(apiClient.addHotelRoom, {
		onSuccess: () => {
			showToast({ message: 'Room Saved!', type: 'SUCCESS' });
		},
		onError: () => {
			showToast({ message: 'Error Saving Room', type: 'ERROR' });
		},
	});

	const handleSave = (roomFormData: FormData) => {
		mutate(roomFormData);
	};

	return (
		<ManageRoomForm
			hotelId={hotelId}
			onSave={handleSave}
			isLoading={isLoading}
		/>
	);
};

export default AddRoom;
