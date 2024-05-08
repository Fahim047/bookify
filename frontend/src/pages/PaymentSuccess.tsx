import { Link } from 'react-router-dom';
function PaymentSuccess() {
	return (
		<div className="flex items-center justify-center">
			<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-16 w-16 text-green-500 mb-6"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M17.707 5.293a1 1 0 0 0-1.414 0L9 12.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0 0-1.414z"
						clipRule="evenodd"
					/>
				</svg>
				<h1 className="text-3xl font-semibold text-gray-800 text-center mb-4">
					Payment Successful!
				</h1>
				<p className="text-lg text-gray-600 text-center mb-6">
					Your booking has been confirmed. Thank you for choosing us!
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

export default PaymentSuccess;
