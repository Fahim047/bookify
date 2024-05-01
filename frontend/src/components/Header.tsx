import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
	const { isLoggedIn } = useAppContext();
	return (
		<div className="bg-blue-800 py-6">
			<div className="container mx-auto flex justify-between">
				<span className="text-3xl text-white font-bold tracking-tight">
					<Link to="/">Bookify.com</Link>
				</span>
				<span className="flex space-x-2">
					{isLoggedIn ? (
						<>
							<Link
								className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
								to="/my-bookings"
							>
								My Bookings
							</Link>
							<Link
								className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
								to="/my-hotels"
							>
								My Hotels
							</Link>
							<SignOutButton />
						</>
					) : (
						<Link
							to="/sign-in"
							className="inline-block px-4 py-2 text-sm font-semibold leading-none text-blue-600 bg-white border border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:border-transparent transition duration-300 ease-in-out"
						>
							Sign In
						</Link>
					)}
				</span>
			</div>
		</div>
	);
};

export default Header;
