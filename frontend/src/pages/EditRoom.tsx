// import { useMutation, useQuery } from 'react-query';
// import { useParams } from 'react-router-dom';
// import * as apiClient from '../api-client';
// import ManageRoomForm from '../forms/ManageRoomForm/ManageRoomForm';
// import { useAppContext } from '../contexts/AppContext';

// const EditRoom = () => {
// 	const { hotelId, roomId } = useParams();
// 	const { showToast } = useAppContext();

// 	const { data: hotel } = useQuery(
// 		'fetchMyHotelRoomById',
// 		() => apiClient.fetchMyHotelById(roomId || ''),
// 		{
// 			enabled: !!roomId,
// 		}
// 	);

// 	const { mutate, isLoading } = useMutation(apiClient.updateMyHotelRoomById, {
// 		onSuccess: () => {
// 			showToast({ message: 'Room Updated!', type: 'SUCCESS' });
// 		},
// 		onError: () => {
// 			showToast({ message: 'Error Editing Room', type: 'ERROR' });
// 		},
// 	});

// 	const handleSave = (roomFormData: FormData) => {
// 		mutate(roomFormData);
// 	};

// 	return (
// 		<ManageRoomForm
// 			room={room}
// 			onSave={handleSave}
// 			isLoading={isLoading}
// 		/>
// 	);
// };

// export default EditRoom;
