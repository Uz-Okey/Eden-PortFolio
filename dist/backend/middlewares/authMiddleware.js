"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
exports.authentication = authentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
async function authentication(req, res, next) {
    const token = req.cookies?.jwt;
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_1.default.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User no longer exists" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Not authorized" });
    }
}
const isAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "user not authorise" });
    }
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
};
exports.isAdmin = isAdmin;
