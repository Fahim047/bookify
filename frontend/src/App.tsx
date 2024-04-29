import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import HotelDetails from './pages/HotelDetails';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home';
import MyHotelRooms from './pages/MyHotelRooms';
import AddRoom from './pages/AddRoom';
import RoomDetails from './pages/RoomDetails';
import EditRoom from './pages/EditRoom';

const App = () => {
	const { isLoggedIn } = useAppContext();
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<Home />
						</Layout>
					}
				/>
				<Route
					path="/search"
					element={
						<Layout>
							<Search />
						</Layout>
					}
				/>
				<Route
					path="/detail/:hotelId"
					element={
						<Layout>
							<HotelDetails />
						</Layout>
					}
				/>
				<Route
					path="/register"
					element={
						<Layout>
							<Register />
						</Layout>
					}
				/>
				<Route
					path="/sign-in"
					element={
						<Layout>
							<SignIn />
						</Layout>
					}
				/>

				{isLoggedIn && (
					<>
						<Route
							path="/hotel/:hotelId/booking/:roomId"
							element={
								<Layout>
									<Booking />
								</Layout>
							}
						/>

						<Route
							path="/add-hotel"
							element={
								<Layout>
									<AddHotel />
								</Layout>
							}
						/>
						<Route
							path="/edit-hotel/:hotelId"
							element={
								<Layout>
									<EditHotel />
								</Layout>
							}
						/>
						<Route
							path="/edit-hotel/:hotelId/rooms"
							element={
								<Layout>
									<MyHotelRooms />
								</Layout>
							}
						/>
						<Route
							path="/edit-hotel/:hotelId/rooms/create"
							element={
								<Layout>
									<AddRoom />
								</Layout>
							}
						/>
						<Route
							path="/edit-hotel/:hotelId/rooms/:roomId/edit"
							element={
								<Layout>
									<EditRoom />
								</Layout>
							}
						/>
						<Route
							path="/my-hotels"
							element={
								<Layout>
									<MyHotels />
								</Layout>
							}
						/>
						<Route
							path="/my-bookings"
							element={
								<Layout>
									<MyBookings />
								</Layout>
							}
						/>
						<Route
							path="/room-detail/:roomId"
							element={
								<Layout>
									<RoomDetails />
								</Layout>
							}
						/>
					</>
				)}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	);
};

export default App;
