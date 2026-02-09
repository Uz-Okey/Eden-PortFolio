"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    username: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true, select: false, minlength: 6 },
    email: { type: String, lowercase: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'], required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
// ready to go!
exports.default = User;
