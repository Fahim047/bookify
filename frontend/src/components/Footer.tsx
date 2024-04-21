const Footer = () => {
	return (
		<div className="bg-blue-800 py-10">
			<div className="container mx-auto flex justify-between items-center">
				<span className="text-3xl text-white font-bold tracking-tight">
					Bookify.com
				</span>
				<span className="text-white font-bold tracking-tight flex gap-4">
					<p className="cursor-pointer">Privacy Policy</p>
					<p className="cursor-pointer">Terms of Service</p>
				</span>
			</div>
			<div className="text-white font-bold tracking-tight text-center mt-5">
				Made with ❤️ by &nbsp;
				<a href="https://github.com/Fahim047">Fahimul Islam</a>
			</div>
		</div>
	);
};

export default Footer;
