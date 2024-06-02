"use strict";
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
const auth_1 = __importDefault(require("../middleware/auth"));
const hotel_1 = require("../models/hotel");
const router = express_1.default.Router();
// /api/my-bookings
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield hotel_1.Booking.find({
            userId: req.userId,
        })
            .populate('hotelId')
            .populate('roomId');
        res.status(200).send(bookings);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to fetch bookings' });
    }
}));
// get bookings by hotelId
router.get('/:hotelId', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield hotel_1.Booking.find({
            hotelId: req.params.hotelId,
        })
            .populate('hotelId')
            .populate('roomId');
        res.status(200).send(bookings);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to fetch bookings' });
    }
}));
exports.default = router;
