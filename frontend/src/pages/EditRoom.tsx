import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import ManageRoomForm from '../forms/ManageRoomForm/ManageRoomForm';
import { useAppContext } from '../contexts/AppContext';

const EditRoom = () => {
	const { hotelId, roomId } = useParams();
	const { showToast } = useAppContext();
	const navigate = useNavigate();

	const { data: room } = useQuery(
		'fetchRoomById',
		() => apiClient.fetchRoomById(roomId || ''),
		{
			enabled: !!roomId,
		}
	);

	const { mutate, isLoading } = useMutation(apiClient.updateMyHotelRoomById, {
		onSuccess: () => {
			showToast({ message: 'Room Updated!', type: 'SUCCESS' });
			navigate(`/edit-hotel/${hotelId}/rooms`);
		},
		onError: () => {
			showToast({ message: 'Error Editing Room', type: 'ERROR' });
		},
	});

	const handleSave = (roomFormData: FormData) => {
		mutate(roomFormData);
	};

	return (
		<ManageRoomForm
			hotelId={hotelId || ''}
			room={room}
			onSave={handleSave}
			isLoading={isLoading}
		/>
	);
};

export default EditRoom;
