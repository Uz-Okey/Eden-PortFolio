"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentProfile = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const createToken_1 = __importDefault(require("../utils/createToken"));
const registerUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const existingUser = await user_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const user = await user_1.default.create({
        username,
        password: hashedPassword,
        email,
    });
    (0, createToken_1.default)(res, user._id.toString());
    res.status(201).json({
        message: "successfully create a user",
        user: {
            username: user.username,
            email: user.email,
            role: user.role,
            id: user._id,
        },
    });
});
exports.registerUser = registerUser;
const loginUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await user_1.default.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "invalid credentials" });
    }
    (0, createToken_1.default)(res, user._id.toString());
    res.status(200).json({
        message: "successfully logged in",
        user: {
            username: user.username,
            email: user.email,
            role: user.role,
            id: user._id,
        },
    });
});
exports.loginUser = loginUser;
const logoutUser = (0, asyncHandler_1.default)(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
});
exports.logoutUser = logoutUser;
//check user profile
const currentProfile = (0, asyncHandler_1.default)(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
    });
});
exports.currentProfile = currentProfile;
