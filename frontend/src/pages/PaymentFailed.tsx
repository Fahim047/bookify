import { Link } from 'react-router-dom';

function PaymentFailed() {
	return (
		<div className="flex items-center justify-center">
			<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-16 w-16 text-red-500 mb-6"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-4.293a1 1 0 011.414 0L10 13.414l1.293-1.293a1 1 0 111.414 1.414L11.414 15l1.293 1.293a1 1 0 11-1.414 1.414L10 16.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 15 7.293 13.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
				<h1 className="text-3xl font-semibold text-gray-800 mb-2">
					Payment Failed
				</h1>
				<p className="text-lg text-gray-600 mb-6 text-center">
					We're sorry, but your payment could not be processed at this
					time. Please try again later.
				</p>
				<Link
					to="/"
					className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center transition duration-300"
				>
					Return to Home
				</Link>
			</div>
		</div>
	);
}

export default PaymentFailed;
