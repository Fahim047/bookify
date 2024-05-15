import express, { Request, Response } from 'express';
import verifyToken from '../middleware/auth';
import { Booking } from '../models/hotel';

const router = express.Router();

// /api/my-bookings
router.get('/', verifyToken, async (req: Request, res: Response) => {
	try {
		const bookings = await Booking.find({
			userId: req.userId,
		})
			.populate('hotelId')
			.populate('roomId');

		res.status(200).send(bookings);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Unable to fetch bookings' });
	}
});

// get bookings by hotelId
router.get('/:hotelId', verifyToken, async (req: Request, res: Response) => {
	try {
		const bookings = await Booking.find({
			hotelId: req.params.hotelId,
		})
			.populate('hotelId')
			.populate('roomId');

		res.status(200).send(bookings);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Unable to fetch bookings' });
	}
});

export default router;
