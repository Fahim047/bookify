import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export type SignInFormData = {
	email: string;
	password: string;
};

const SignIn = () => {
	const { showToast } = useAppContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const location = useLocation();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<SignInFormData>();

	const mutation = useMutation(apiClient.signIn, {
		onSuccess: async () => {
			showToast({ message: 'Sign in Successful!', type: 'SUCCESS' });
			await queryClient.invalidateQueries('validateToken');
			navigate(location.state?.from?.pathname || '/');
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' });
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		<form
			className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
			onSubmit={onSubmit}
		>
			<h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

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

			<div className="mb-6">
				<label
					htmlFor="password"
					className="text-sm font-bold text-gray-700"
				>
					Password
				</label>
				<input
					id="password"
					type="password"
					className="w-full border rounded py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500"
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters',
						},
					})}
				/>
				{errors.password && (
					<span className="text-red-500 text-xs">
						{errors.password.message}
					</span>
				)}
			</div>

			<div className="flex items-center justify-between">
				<span className="text-sm">
					Not Registered?{' '}
					<Link
						to="/register"
						className="text-blue-500 hover:underline"
					>
						Create an account here
					</Link>
				</span>
				<button
					type="submit"
					className="bg-blue-600 text-white py-2 px-4 rounded-full font-bold text-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
				>
					Login
				</button>
			</div>
		</form>
	);
};

export default SignIn;
