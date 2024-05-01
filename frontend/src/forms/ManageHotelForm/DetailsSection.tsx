import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

type Props = {
	hotelId?: string;
};
const DetailsSection = ({ hotelId }: Props) => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold mb-3">
				{hotelId ? 'Edit Hotel' : 'Add Hotel'}
			</h1>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Name
				<input
					type="text"
					className="border rounded w-full py-1 px-2 font-normal"
					{...register('name', {
						required: 'This field is required',
					})}
				></input>
				{errors.name && (
					<span className="text-red-500">{errors.name.message}</span>
				)}
			</label>

			<div className="flex gap-4">
				<label className="text-gray-700 text-sm font-bold flex-1">
					City
					<input
						type="text"
						className="border rounded w-full py-1 px-2 font-normal"
						{...register('city', {
							required: 'This field is required',
						})}
					></input>
					{errors.city && (
						<span className="text-red-500">
							{errors.city.message}
						</span>
					)}
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Country
					<input
						type="text"
						className="border rounded w-full py-1 px-2 font-normal"
						{...register('country', {
							required: 'This field is required',
						})}
					></input>
					{errors.country && (
						<span className="text-red-500">
							{errors.country.message}
						</span>
					)}
				</label>
			</div>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Phone Number
				<input
					type="text"
					className="border rounded w-full py-1 px-2 font-normal"
					{...register('contactNumber', {
						required: 'This field is required',
					})}
				></input>
				{errors.contactNumber && (
					<span className="text-red-500">
						{errors.contactNumber.message}
					</span>
				)}
			</label>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Description
				<textarea
					rows={10}
					className="border rounded w-full py-1 px-2 font-normal"
					{...register('description', {
						required: 'This field is required',
					})}
				></textarea>
				{errors.description && (
					<span className="text-red-500">
						{errors.description.message}
					</span>
				)}
			</label>
		</div>
	);
};

export default DetailsSection;
