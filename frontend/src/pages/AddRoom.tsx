import { useMutation } from 'react-query';
import ManageRoomForm from '../forms/ManageRoomForm/ManageRoomForm';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';
import { useParams, useNavigate } from 'react-router-dom';

const AddRoom = () => {
	const { hotelId } = useParams();
	const { showToast } = useAppContext();
	const navigate = useNavigate();

	const { mutate, isLoading } = useMutation(apiClient.addHotelRoom, {
		onSuccess: () => {
			showToast({ message: 'Room Saved!', type: 'SUCCESS' });
			navigate(`/hotel/${hotelId}/rooms`);
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
			hotelId={hotelId || ''}
			onSave={handleSave}
			isLoading={isLoading}
		/>
	);
};

export default AddRoom;
