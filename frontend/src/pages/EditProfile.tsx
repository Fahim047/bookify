import * as apiClient from '../api-client';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { UserType } from '../../../backend/src/shared/types';
import { RegisterFormData } from './Register';

function EditProfileForm() {
	const { showToast } = useAppContext();
	const navigate = useNavigate();
	const formMethods = useForm<RegisterFormData>();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = formMethods;

	// Fetch user data
	const { data: currentUser, isLoading: isUserLoading } = useQuery<UserType>(
		'currentUser',
		apiClient.fetchCurrentUser,
		{
			onError: () => {
				showToast({
					message: 'Error fetching user data',
					type: 'ERROR',
				});
			},
		}
	);

	// Mutation for updating user profile
	const { mutate, isLoading: isMutationLoading } = useMutation(
		apiClient.updateProfile,
		{
			onSuccess: () => {
				showToast({
					message: 'Profile updated successfully!',
					type: 'SUCCESS',
				});
				navigate(`/`);
			},
			onError: () => {
				showToast({
					message: 'Error updating profile!',
					type: 'ERROR',
				});
			},
		}
	);

	const onSubmit = handleSubmit((formDataJson: RegisterFormData) => {
		// console.log(formDataJson);

		mutate(formDataJson);
	});

	if (isUserLoading || isMutationLoading) return <div>Loading...</div>;

	return (
		<FormProvider {...formMethods}>
			<form
				className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
				onSubmit={onSubmit}
			>
				<h2 className="text-3xl font-bold mb-6 text-center">
					Update Your Profile
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					<div>
						<label
							htmlFor="firstName"
							className="text-sm font-bold text-gray-700"
						>
							First Name
						</label>
						<input
							id="firstName"
							type="text"
							className="w-full border rounded py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500"
							defaultValue={currentUser?.firstName || ''}
							{...register('firstName', {
								required: 'This field is required',
							})}
						/>
						{errors.firstName && (
							<span className="text-red-500 text-xs">
								{errors.firstName.message}
							</span>
						)}
					</div>
					<div>
						<label
							htmlFor="lastName"
							className="text-sm font-bold text-gray-700"
						>
							Last Name
						</label>
						<input
							id="lastName"
							type="text"
							className="w-full border rounded py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500"
							defaultValue={currentUser?.lastName || ''}
							{...register('lastName', {
								required: 'This field is required',
							})}
						/>
						{errors.lastName && (
							<span className="text-red-500 text-xs">
								{errors.lastName.message}
							</span>
						)}
					</div>
				</div>

				<div className="mb-4">
					<label
						htmlFor="email"
						className="text-sm font-bold text-gray-700"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						className="w-full border rounded py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500"
						defaultValue={currentUser?.email || ''}
						{...register('email', {
							required: 'This field is required',
						})}
					/>
					{errors.email && (
						<span className="text-red-500 text-xs">
							{errors.email.message}
						</span>
					)}
				</div>
				<div className="mb-4">
					<label
						htmlFor="phoneNumber"
						className="text-sm font-bold text-gray-700"
					>
						Phone Number
					</label>
					<input
						id="phoneNumber"
						type="tel" // Using "tel" type for phone number input
						className="w-full border rounded py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500"
						defaultValue={currentUser?.phoneNumber || ''}
						{...register('phoneNumber', {
							required: 'This field is required',
						})}
					/>
					{errors.phoneNumber && (
						<span className="text-red-500 text-xs">
							{errors.phoneNumber.message}
						</span>
					)}
				</div>

				<button
					type="submit"
					className="bg-blue-600 text-white py-2 px-4 rounded-full font-bold text-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
				>
					Update Profile
				</button>
			</form>
		</FormProvider>
	);
}

export default EditProfileForm;
