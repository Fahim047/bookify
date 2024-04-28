import { useFormContext } from 'react-hook-form';
import { RoomFormData } from './ManageRoomForm';

const DetailsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<RoomFormData>();

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold mb-3">Add Room</h1>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Room Number
				<input
					type="text"
					className="border rounded w-full py-1 px-2 font-normal"
					{...register('roomNumber', {
						required: 'This field is required',
					})}
				></input>
				{errors.roomNumber && (
					<span className="text-red-500">
						{errors.roomNumber.message}
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
			<label className="text-gray-700 text-sm font-bold max-w-[50%]">
				Price Per Night
				<input
					type="number"
					min={1}
					className="border rounded w-full py-1 px-2 font-normal"
					{...register('pricePerNight', {
						required: 'This field is required',
					})}
				></input>
				{errors.pricePerNight && (
					<span className="text-red-500">
						{errors.pricePerNight.message}
					</span>
				)}
			</label>
		</div>
	);
};

export default DetailsSection;
