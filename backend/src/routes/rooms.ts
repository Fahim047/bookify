import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { Booking, Room } from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';
import { BookingType, RoomType } from '../shared/types';
import { ObjectId } from 'mongodb';
const SSLCommerzPayment = require('sslcommerz-lts');
const router = express.Router();

const store_id = process.env.SSL_COMMERZ_STORE_ID || '';
const store_passwd = process.env.SSL_COMMERZ_STORE_PASSWORD || '';
const is_live = false; //true for live, false for sandbox

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
});

router.post(
	'/',
	verifyToken,
	[
		body('roomNumber').notEmpty().withMessage('Room Number is required'),
		body('description').notEmpty().withMessage('Description is required'),
		body('type').notEmpty().withMessage('Room type is required'),
		body('pricePerNight')
			.notEmpty()
			.isNumeric()
			.withMessage('Price per night is required and must be a number'),
		body('facilities')
			.notEmpty()
			.isArray()
			.withMessage('Facilities are required'),
	],
	upload.array('imageFiles', 6),
	async (req: Request, res: Response) => {
		try {
			const imageFiles = req.files as Express.Multer.File[];
			const newRoom: RoomType = req.body;

			const imageUrls = await uploadImages(imageFiles);

			newRoom.imageUrls = imageUrls;

			const room = new Room(newRoom);
			await room.save();

			// Update the hotel document to push the newly created room
			const updatedHotel = await Hotel.findByIdAndUpdate(
				req.body.hotelId, // Assuming hotelId is provided in the request body
				{ $push: { rooms: room } },
				{ new: true }
			);

			if (!updatedHotel) {
				return res
					.status(400)
					.json({ message: 'Hotel not found or unable to update' });
			}

			res.status(201).send(room);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Something went wrong' });
		}
	}
);

router.get(
	'/getRoomsByHotelId/:hotelId',

	async (req: Request, res: Response) => {
		try {
			const hotelId = req.params.hotelId.toString();
			// console.log(hotelId);

			const rooms = await Room.find({ hotelId: hotelId });
			// console.log(rooms);
			res.json(rooms);
		} catch (error) {
			res.status(500).json({
				message: 'Error fetching rooms of the hotel!',
			});
		}
	}
);

router.get('/:roomId', async (req: Request, res: Response) => {
	const roomId = req.params.roomId.toString();
	try {
		const room = await Room.findOne({
			_id: roomId,
		});

		res.json(room);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching room!' });
	}
});

router.put(
	'/edit/:roomId',
	upload.array('imageFiles'),
	async (req: Request, res: Response) => {
		try {
			const updatedRoom: RoomType = req.body;

			const room = await Room.findOneAndUpdate(
				{
					_id: req.params.roomId,
				},
				updatedRoom,
				{ new: true }
			);

			if (!room) {
				return res.status(404).json({ message: 'Room not found' });
			}

			const files = req.files as Express.Multer.File[];
			const updatedImageUrls = await uploadImages(files);

			room.imageUrls = [
				...updatedImageUrls,
				...(updatedRoom.imageUrls || []),
			];

			await room.save();
			res.status(201).json(room);
		} catch (error) {
			res.status(500).json({ message: 'Something went wrong!' });
		}
	}
);

router.post(
	'/:hotelId/bookings/:roomId/book-now',
	async (req: Request, res: Response) => {
		const tran_id = new ObjectId().toString();
		const data = {
			total_amount: req.body.totalCost,
			currency: 'BDT',
			tran_id, // use unique tran_id for each api call
			success_url: `http://localhost:7000/api/rooms/${req.params.hotelId}/bookings/${req.params.roomId}/payment/success/${tran_id}`,
			fail_url: `http://localhost:7000/api/rooms/${req.params.hotelId}/bookings/${req.params.roomId}/payment/failed/${tran_id}`,
			cancel_url: 'http://localhost:7000/cancel',
			ipn_url: 'http://localhost:7000/ipn',
			shipping_method: 'Courier',
			product_name: 'Computer.',
			product_category: 'Electronic',
			product_profile: 'general',
			cus_name: `${req.body.firstName} ${req.body.lastName}`,
			cus_email: req.body.email,
			cus_add1: 'Dhaka',
			cus_add2: 'Dhaka',
			cus_city: 'Dhaka',
			cus_state: 'Dhaka',
			cus_postcode: '1000',
			cus_country: 'Bangladesh',
			cus_phone: '01711111111',
			cus_fax: '01711111111',
			ship_name: `${req.body.firstName} ${req.body.lastName}`,
			ship_add1: 'Dhaka',
			ship_add2: 'Dhaka',
			ship_city: 'Dhaka',
			ship_state: 'Dhaka',
			ship_postcode: 1000,
			ship_country: 'Bangladesh',
		};

		const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
		sslcz.init(data).then((apiResponse: { GatewayPageURL: any }) => {
			// Redirect the user to payment gateway
			let GatewayPageURL = apiResponse.GatewayPageURL;
			res.send({ url: GatewayPageURL });
			console.log('Redirecting to: ', GatewayPageURL);
		});

		const newBooking: BookingType = {
			...req.body,
			paymentStatus: false,
			transactionId: tran_id,
		};

		const tempBooking = await Booking.create(newBooking);
		if (!tempBooking) {
			return res
				.status(400)
				.json({ message: 'Temporary booking not created' });
		}
	}
);

router.post(
	'/:hotelId/bookings/:roomId/payment/success/:tranId',
	async (req, res) => {
		try {
			// Update booking payment status
			const updatedBooking = await Booking.findOneAndUpdate(
				{ transactionId: req.params.tranId },
				{ paymentStatus: true },
				{ new: true }
			);

			if (!updatedBooking) {
				return res
					.status(400)
					.json({ message: 'Booking not found or already updated' });
			}

			// Associate booking with room
			const newBooking = await Booking.findById(updatedBooking._id);
			const updatedRoom = await Room.findByIdAndUpdate(
				req.params.roomId,
				{
					$push: {
						bookings: newBooking,
						alreadyBooked: {
							checkIn: newBooking?.checkIn,
							checkOut: newBooking?.checkOut,
						},
					},
				},
				{ new: true }
			);

			if (!updatedRoom) {
				return res.status(400).json({ message: 'Room not found' });
			}

			// Associate room with hotel
			const updatedHotel = await Hotel.findByIdAndUpdate(
				req.params.hotelId,
				{ $push: { rooms: updatedRoom } },
				{ new: true }
			);

			if (!updatedHotel) {
				return res.status(400).json({ message: 'Hotel not found' });
			}

			// Redirect to success page
			return res.redirect('http://localhost:5174/successful-booking');
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Something went wrong' });
		}
	}
);

router.post(
	'/:hotelId/bookings/:roomId/payment/failed/:tranId',
	async (req: Request, res: Response) => {
		try {
			const booking = await Booking.deleteOne({
				transactionId: req.params.tranId,
			});
			if (!booking) {
				return res
					.status(400)
					.json({ message: 'Unsuccessful booking not deleted!' });
			}

			res.redirect('http://localhost:5174/payment-failed');
		} catch (error) {
			console.log(error);
		}
	}
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
	const uploadPromises = imageFiles.map(async (image) => {
		const b64 = Buffer.from(image.buffer).toString('base64');
		let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
		const res = await cloudinary.v2.uploader.upload(dataURI);
		return res.url;
	});

	const imageUrls = await Promise.all(uploadPromises);
	return imageUrls;
}

export default router;
