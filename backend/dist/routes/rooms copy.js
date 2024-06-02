"use strict";
// import express, { Request, Response } from 'express';
// import multer from 'multer';
// import cloudinary from 'cloudinary';
// import { Booking, Room } from '../models/hotel';
// import verifyToken from '../middleware/auth';
// import { body } from 'express-validator';
// import { BookingType, RoomType } from '../shared/types';
// import Stripe from 'stripe';
// const SSLCommerzPayment = require('sslcommerz-lts');
// const stripe = new Stripe(process.env.STRIPE_API_KEY as string);
// const router = express.Router();
// const store_id = process.env.SSL_COMMERZ_STORE_ID || '';
// const store_passwd = process.env.SSL_COMMERZ_STORE_PASSWORD || '';
// const is_live = false; //true for live, false for sandbox
// const storage = multer.memoryStorage();
// const upload = multer({
// 	storage: storage,
// 	limits: {
// 		fileSize: 5 * 1024 * 1024, // 5MB
// 	},
// });
// router.post(
// 	'/',
// 	verifyToken,
// 	[
// 		body('roomNumber').notEmpty().withMessage('Room Number is required'),
// 		body('description').notEmpty().withMessage('Description is required'),
// 		body('type').notEmpty().withMessage('Room type is required'),
// 		body('pricePerNight')
// 			.notEmpty()
// 			.isNumeric()
// 			.withMessage('Price per night is required and must be a number'),
// 		body('facilities')
// 			.notEmpty()
// 			.isArray()
// 			.withMessage('Facilities are required'),
// 	],
// 	upload.array('imageFiles', 6),
// 	async (req: Request, res: Response) => {
// 		try {
// 			const imageFiles = req.files as Express.Multer.File[];
// 			const newRoom: RoomType = req.body;
// 			const imageUrls = await uploadImages(imageFiles);
// 			newRoom.imageUrls = imageUrls;
// 			const room = new Room(newRoom);
// 			await room.save();
// 			res.status(201).send(room);
// 		} catch (e) {
// 			console.log(e);
// 			res.status(500).json({ message: 'Something went wrong' });
// 		}
// 	}
// );
// router.get(
// 	'/getRoomsByHotelId/:hotelId',
// 	async (req: Request, res: Response) => {
// 		try {
// 			const hotelId = req.params.hotelId.toString();
// 			// console.log(hotelId);
// 			const rooms = await Room.find({ hotelId: hotelId });
// 			// console.log(rooms);
// 			res.json(rooms);
// 		} catch (error) {
// 			res.status(500).json({
// 				message: 'Error fetching rooms of the hotel!',
// 			});
// 		}
// 	}
// );
// router.get('/:roomId', async (req: Request, res: Response) => {
// 	const roomId = req.params.roomId.toString();
// 	try {
// 		const room = await Room.findOne({
// 			_id: roomId,
// 		});
// 		res.json(room);
// 	} catch (error) {
// 		res.status(500).json({ message: 'Error fetching room!' });
// 	}
// });
// router.put(
// 	'/edit/:roomId',
// 	upload.array('imageFiles'),
// 	async (req: Request, res: Response) => {
// 		try {
// 			const updatedRoom: RoomType = req.body;
// 			// updatedRoom.lastUpdated = new Date();
// 			const room = await Room.findOneAndUpdate(
// 				{
// 					_id: req.params.roomId,
// 					// hotelId: req.params.hotelId,
// 				},
// 				updatedRoom,
// 				{ new: true }
// 			);
// 			if (!room) {
// 				return res.status(404).json({ message: 'Room not found' });
// 			}
// 			const files = req.files as Express.Multer.File[];
// 			const updatedImageUrls = await uploadImages(files);
// 			room.imageUrls = [
// 				...updatedImageUrls,
// 				...(updatedRoom.imageUrls || []),
// 			];
// 			await room.save();
// 			res.status(201).json(room);
// 		} catch (error) {
// 			res.status(500).json({ message: 'Something went wrong!' });
// 		}
// 	}
// );
// router.post(
// 	'/:roomId/bookings/payment-intent',
// 	async (req: Request, res: Response) => {
// 		const { numberOfNights } = req.body;
// 		const roomId = req.params.roomId;
// 		const room = await Room.findById(roomId);
// 		if (!room) {
// 			return res.status(400).json({ message: 'Room not found' });
// 		}
// 		const totalCost = room.pricePerNight * numberOfNights;
// 		const paymentIntent = await stripe.paymentIntents.create({
// 			amount: totalCost * 100,
// 			currency: 'gbp',
// 			metadata: {
// 				roomId,
// 				userId: req.userId,
// 			},
// 		});
// 		if (!paymentIntent.client_secret) {
// 			return res
// 				.status(500)
// 				.json({ message: 'Error creating payment intent' });
// 		}
// 		const response = {
// 			paymentIntentId: paymentIntent.id,
// 			clientSecret: paymentIntent.client_secret.toString(),
// 			totalCost,
// 		};
// 		res.send(response);
// 	}
// );
// router.post(
// 	'/:hotelId/bookings/:roomId',
// 	async (req: Request, res: Response) => {
// 		try {
// 			const paymentIntentId = req.body.paymentIntentId;
// 			const paymentIntent = await stripe.paymentIntents.retrieve(
// 				paymentIntentId as string
// 			);
// 			if (!paymentIntent) {
// 				return res
// 					.status(400)
// 					.json({ message: 'payment intent not found' });
// 			}
// 			if (
// 				paymentIntent.metadata.roomId !== req.params.roomId ||
// 				paymentIntent.metadata.userId !== req.userId
// 			) {
// 				return res
// 					.status(400)
// 					.json({ message: 'payment intent mismatch' });
// 			}
// 			if (paymentIntent.status !== 'succeeded') {
// 				return res.status(400).json({
// 					message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
// 				});
// 			}
// 			const newBooking: BookingType = {
// 				...req.body,
// 			};
// 			console.log(newBooking);
// 			const booking = await Booking.create(newBooking);
// 			if (!booking) {
// 				return res.status(400).json({ message: 'booking not created' });
// 			}
// 			const room = await Room.findOneAndUpdate(
// 				{ _id: req.params.roomId },
// 				{
// 					$push: {
// 						bookings: newBooking,
// 						alreadyBooked: {
// 							checkIn: newBooking.checkIn,
// 							checkOut: newBooking.checkOut,
// 						},
// 					},
// 				},
// 				{ new: true }
// 			);
// 			if (!room) {
// 				return res.status(400).json({ message: 'room not found' });
// 			}
// 			await room.save();
// 			res.status(200).send();
// 		} catch (error) {
// 			console.log(error);
// 			res.status(500).json({ message: 'something went wrong' });
// 		}
// 	}
// );
// async function uploadImages(imageFiles: Express.Multer.File[]) {
// 	const uploadPromises = imageFiles.map(async (image) => {
// 		const b64 = Buffer.from(image.buffer).toString('base64');
// 		let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
// 		const res = await cloudinary.v2.uploader.upload(dataURI);
// 		return res.url;
// 	});
// 	const imageUrls = await Promise.all(uploadPromises);
// 	return imageUrls;
// }
// export default router;
