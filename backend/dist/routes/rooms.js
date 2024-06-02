"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const hotel_1 = __importStar(require("../models/hotel"));
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const SSLCommerzPayment = require('sslcommerz-lts');
const router = express_1.default.Router();
const store_id = process.env.SSL_COMMERZ_STORE_ID || '';
const store_passwd = process.env.SSL_COMMERZ_STORE_PASSWORD || '';
const is_live = false; //true for live, false for sandbox
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
router.post('/', auth_1.default, [
    (0, express_validator_1.body)('roomNumber').notEmpty().withMessage('Room Number is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('type').notEmpty().withMessage('Room type is required'),
    (0, express_validator_1.body)('pricePerNight')
        .notEmpty()
        .isNumeric()
        .withMessage('Price per night is required and must be a number'),
    (0, express_validator_1.body)('facilities')
        .notEmpty()
        .isArray()
        .withMessage('Facilities are required'),
], upload.array('imageFiles', 6), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFiles = req.files;
        const newRoom = req.body;
        const imageUrls = yield uploadImages(imageFiles);
        newRoom.imageUrls = imageUrls;
        const room = new hotel_1.Room(newRoom);
        yield room.save();
        // Update the hotel document to push the newly created room
        const updatedHotel = yield hotel_1.default.findByIdAndUpdate(req.body.hotelId, // Assuming hotelId is provided in the request body
        { $push: { rooms: room } }, { new: true });
        if (!updatedHotel) {
            return res
                .status(400)
                .json({ message: 'Hotel not found or unable to update' });
        }
        res.status(201).send(room);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
router.get('/getRoomsByHotelId/:hotelId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelId = req.params.hotelId.toString();
        // console.log(hotelId);
        const rooms = yield hotel_1.Room.find({ hotelId: hotelId });
        // console.log(rooms);
        res.json(rooms);
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching rooms of the hotel!',
        });
    }
}));
router.get('/:roomId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.roomId.toString();
    try {
        const room = yield hotel_1.Room.findOne({
            _id: roomId,
        });
        res.json(room);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching room!' });
    }
}));
router.put('/edit/:roomId', upload.array('imageFiles'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRoom = req.body;
        const room = yield hotel_1.Room.findOneAndUpdate({
            _id: req.params.roomId,
        }, updatedRoom, { new: true });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        const files = req.files;
        const updatedImageUrls = yield uploadImages(files);
        room.imageUrls = [
            ...updatedImageUrls,
            ...(updatedRoom.imageUrls || []),
        ];
        yield room.save();
        res.status(201).json(room);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong!' });
    }
}));
router.post('/:hotelId/bookings/:roomId/book-now', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tran_id = new mongodb_1.ObjectId().toString();
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
    sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });
        console.log('Redirecting to: ', GatewayPageURL);
    });
    const newBooking = Object.assign(Object.assign({}, req.body), { paymentStatus: false, transactionId: tran_id });
    const tempBooking = yield hotel_1.Booking.create(newBooking);
    if (!tempBooking) {
        return res
            .status(400)
            .json({ message: 'Temporary booking not created' });
    }
}));
router.post('/:hotelId/bookings/:roomId/payment/success/:tranId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update booking payment status
        const updatedBooking = yield hotel_1.Booking.findOneAndUpdate({ transactionId: req.params.tranId }, { paymentStatus: true }, { new: true });
        if (!updatedBooking) {
            return res
                .status(400)
                .json({ message: 'Booking not found or already updated' });
        }
        // Associate booking with room
        const newBooking = yield hotel_1.Booking.findById(updatedBooking._id);
        const updatedRoom = yield hotel_1.Room.findByIdAndUpdate(req.params.roomId, {
            $push: {
                bookings: newBooking,
                alreadyBooked: {
                    checkIn: newBooking === null || newBooking === void 0 ? void 0 : newBooking.checkIn,
                    checkOut: newBooking === null || newBooking === void 0 ? void 0 : newBooking.checkOut,
                },
            },
        }, { new: true });
        if (!updatedRoom) {
            return res.status(400).json({ message: 'Room not found' });
        }
        // Associate room with hotel
        const updatedHotel = yield hotel_1.default.findByIdAndUpdate(req.params.hotelId, { $push: { rooms: updatedRoom } }, { new: true });
        if (!updatedHotel) {
            return res.status(400).json({ message: 'Hotel not found' });
        }
        // Redirect to success page
        return res.redirect('http://localhost:5174/successful-booking');
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}));
router.post('/:hotelId/bookings/:roomId/payment/failed/:tranId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield hotel_1.Booking.deleteOne({
            transactionId: req.params.tranId,
        });
        if (!booking) {
            return res
                .status(400)
                .json({ message: 'Unsuccessful booking not deleted!' });
        }
        res.redirect('http://localhost:5174/payment-failed');
    }
    catch (error) {
        console.log(error);
    }
}));
function uploadImages(imageFiles) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadPromises = imageFiles.map((image) => __awaiter(this, void 0, void 0, function* () {
            const b64 = Buffer.from(image.buffer).toString('base64');
            let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
            const res = yield cloudinary_1.default.v2.uploader.upload(dataURI);
            return res.url;
        }));
        const imageUrls = yield Promise.all(uploadPromises);
        return imageUrls;
    });
}
exports.default = router;
