import { Link } from 'react-router-dom';
import { HotelType } from '../../../backend/src/shared/types';
type Props = {
	hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
			<div className="w-full h-[300px]">
				<img
					src={hotel.imageUrls[0]}
					className="w-full h-full object-cover object-center"
				/>
			</div>
			<div className="grid grid-rows-[1fr_2fr_1fr]">
				<div>
					<Link
						to={`/detail/${hotel._id}`}
						className="text-2xl font-bold cursor-pointer"
					>
						{hotel.name}
					</Link>
				</div>

				<div>
					<div className="line-clamp-4">{hotel.description}</div>
				</div>

				<div className="grid grid-cols-2 items-end whitespace-nowrap">
					<div className="flex flex-col items-end gap-1">
						<Link
							to={`/detail/${hotel._id}`}
							className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500"
						>
							View More
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchResultsCard;
