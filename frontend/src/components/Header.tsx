import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { RiArrowDropDownLine } from 'react-icons/ri';

const Header = () => {
	const { isLoggedIn } = useAppContext();
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const { data: currentUser } = useQuery(
		'fetchCurrentUser',
		apiClient.fetchCurrentUser
	);

	const handleToggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

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
								className="inline-block px-6 py-2 text-sm font-medium text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300 ease-in-out"
								to="/my-bookings"
							>
								My Bookings
							</Link>
							<Link
								className="inline-block px-6 py-2 text-sm font-medium text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300 ease-in-out"
								to="/my-hotels"
							>
								My Hotels
							</Link>
							<div className="relative inline-block">
								<button
									onClick={handleToggleDropdown}
									className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300 ease-in-out"
								>
									Hello, {currentUser?.firstName}
									<span className="text-2xl">
										<RiArrowDropDownLine />
									</span>
								</button>
								{dropdownOpen && (
									<div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
										<Link
											to="/edit-profile"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
										>
											Edit Profile
										</Link>
										<SignOutButton />
									</div>
								)}
							</div>
						</>
					) : (
						<>
							<Link
								to="/register"
								className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg shadow-sm hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300 ease-in-out"
							>
								Register
							</Link>
							<Link
								to="/sign-in"
								className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg shadow-sm hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300 ease-in-out"
							>
								Sign In
							</Link>
						</>
					)}
				</span>
			</div>
		</div>
	);
};

export default Header;
