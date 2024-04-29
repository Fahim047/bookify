import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { showToast } = useAppContext();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const mutation = useMutation(apiClient.register, {
		onSuccess: async () => {
			showToast({ message: 'Registration Success!', type: 'SUCCESS' });
			await queryClient.invalidateQueries('validateToken');
			navigate('/');
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' });
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		// <form className="flex flex-col gap-5" onSubmit={onSubmit}>
		//   <h2 className="text-3xl font-bold">Create an Account</h2>
		//   <div className="flex flex-col md:flex-row gap-5">
		//     <label className="text-gray-700 text-sm font-bold flex-1">
		//       First Name
		//       <input
		//         className="border rounded w-full py-1 px-2 font-normal"
		//         {...register("firstName", { required: "This field is required" })}
		//       ></input>
		//       {errors.firstName && (
		//         <span className="text-red-500">{errors.firstName.message}</span>
		//       )}
		//     </label>
		//     <label className="text-gray-700 text-sm font-bold flex-1">
		//       Last Name
		//       <input
		//         className="border rounded w-full py-1 px-2 font-normal"
		//         {...register("lastName", { required: "This field is required" })}
		//       ></input>
		//       {errors.lastName && (
		//         <span className="text-red-500">{errors.lastName.message}</span>
		//       )}
		//     </label>
		//   </div>
		//   <label className="text-gray-700 text-sm font-bold flex-1">
		//     Email
		//     <input
		//       type="email"
		//       className="border rounded w-full py-1 px-2 font-normal"
		//       {...register("email", { required: "This field is required" })}
		//     ></input>
		//     {errors.email && (
		//       <span className="text-red-500">{errors.email.message}</span>
		//     )}
		//   </label>
		//   <label className="text-gray-700 text-sm font-bold flex-1">
		//     Password
		//     <input
		//       type="password"
		//       className="border rounded w-full py-1 px-2 font-normal"
		//       {...register("password", {
		//         required: "This field is required",
		//         minLength: {
		//           value: 6,
		//           message: "Password must be at least 6 characters",
		//         },
		//       })}
		//     ></input>
		//     {errors.password && (
		//       <span className="text-red-500">{errors.password.message}</span>
		//     )}
		//   </label>
		//   <label className="text-gray-700 text-sm font-bold flex-1">
		//     Confirm Password
		//     <input
		//       type="password"
		//       className="border rounded w-full py-1 px-2 font-normal"
		//       {...register("confirmPassword", {
		//         validate: (val) => {
		//           if (!val) {
		//             return "This field is required";
		//           } else if (watch("password") !== val) {
		//             return "Your passwords do no match";
		//           }
		//         },
		//       })}
		//     ></input>
		//     {errors.confirmPassword && (
		//       <span className="text-red-500">{errors.confirmPassword.message}</span>
		//     )}
		//   </label>
		//   <span>
		//     <button
		//       type="submit"
		//       className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
		//     >
		//       Create Account
		//     </button>
		//   </span>
		// </form>
		<form
			className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
			onSubmit={onSubmit}
		>
			<h2 className="text-3xl font-bold mb-6 text-center">
				Create an Account
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

			<div className="mb-4">
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

			<div className="mb-6">
				<label
					htmlFor="confirmPassword"
					className="text-sm font-bold text-gray-700"
				>
					Confirm Password
				</label>
				<input
					id="confirmPassword"
					type="password"
					className="w-full border rounded py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500"
					{...register('confirmPassword', {
						validate: (val) => {
							if (!val) {
								return 'This field is required';
							} else if (watch('password') !== val) {
								return 'Your passwords do not match';
							}
						},
					})}
				/>
				{errors.confirmPassword && (
					<span className="text-red-500 text-xs">
						{errors.confirmPassword.message}
					</span>
				)}
			</div>

			<button
				type="submit"
				className="bg-blue-600 text-white py-2 px-4 rounded-full font-bold text-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
			>
				Create Account
			</button>
		</form>
	);
};

export default Register;
