"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.Room = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    userId: { type: String },
    totalCost: { type: Number, required: true },
    roomId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    hotelId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    transactionId: { type: String },
    paymentStatus: { type: Boolean, default: false },
});
const DateRangeSchema = new mongoose_1.default.Schema({
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
});
const roomSchema = new mongoose_1.default.Schema({
    hotelId: { type: String, required: true },
    roomNumber: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    imageUrls: [{ type: String, required: true }],
    bookings: [bookingSchema],
    alreadyBooked: [DateRangeSchema],
});
const hotelSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    contactNumber: { type: String, required: true },
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true },
    rooms: [roomSchema],
});
const Hotel = mongoose_1.default.model('Hotel', hotelSchema);
exports.Room = mongoose_1.default.model('Room', roomSchema);
exports.Booking = mongoose_1.default.model('Booking', bookingSchema);
exports.default = Hotel;
