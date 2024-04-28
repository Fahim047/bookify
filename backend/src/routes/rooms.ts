import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { Room } from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';
import { RoomType } from '../shared/types';

const router = express.Router();

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
		body('roomNumber').notEmpty().withMessage('Name is required'),
		body('description').notEmpty().withMessage('Description is required'),
		body('type').notEmpty().withMessage('Hotel type is required'),
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
			// newRoom.lastUpdated = new Date();
			// newRoom.hotelId = req.hotelId;
			// newRoom.hotelId = req.params.hotelId;

			const room = new Room(newRoom);
			await room.save();

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
	console.log(roomId);
	try {
		const room = await Room.findOne({
			_id: roomId,
			// hotelId: req.userId,
		});
		console.log(room);
		res.json(room);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching room!' });
	}
});

router.put(
	'/:roomId',
	verifyToken,
	upload.array('imageFiles'),
	async (req: Request, res: Response) => {
		try {
			const updatedRoom: RoomType = req.body;
			// updatedRoom.lastUpdated = new Date();

			const room = await Room.findOneAndUpdate(
				{
					_id: req.params.roomId,
					// userId: req.userId,
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
			res.status(500).json({ message: 'Something went throw' });
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
