import { RoomType } from '../../../../backend/src/shared/types';

type Props = {
	room: RoomType;
};
const RoomCard = ({ room }: Props) => {
	return (
		<div className="hover:cursor-pointer mb-3">
			<h1 className="text-xl font-bold mb-2">{room.roomNumber}</h1>
			<img src={room.imageUrls[0]} alt="" height={300} width={300} />
		</div>
	);
};

export default RoomCard;
