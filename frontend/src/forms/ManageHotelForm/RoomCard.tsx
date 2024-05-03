import { RoomType } from '../../../../backend/src/shared/types';

type Props = {
	room: RoomType;
};
const RoomCard = ({ room }: Props) => {
	return (
		<div className="mb-3">
			<h1 className="text-xl font-bold mb-2">{room.roomNumber}</h1>
			<div className="h-300px">
				<img
					src={room.imageUrls[0]}
					alt=""
					className="w-[200px] h-[200px] object-cover object-center rounded-md "
				/>
			</div>
		</div>
	);
};

export default RoomCard;
