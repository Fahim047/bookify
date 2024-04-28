import { RoomType } from '../../../../backend/src/shared/types';

type Props = {
	room: RoomType;
};
const RoomCard = ({ room }: Props) => {
	return (
		<div className="hover:cursor-pointer">
			<img src={room.imageUrls[0]} alt="" height={300} width={300} />
			<h1>{room.roomNumber}</h1>
		</div>
	);
};

export default RoomCard;
