import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const SignOutButton = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();

	const mutation = useMutation(apiClient.signOut, {
		onSuccess: async () => {
			await queryClient.invalidateQueries('validateToken');
			showToast({ message: 'Signed Out!', type: 'SUCCESS' });
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' });
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};

	return (
		<button
			onClick={handleClick}
			className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
		>
			Sign Out
		</button>
	);
};

export default SignOutButton;
