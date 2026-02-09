"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userRoute = express_1.default.Router();
userRoute.route('/register').post(userControllers_1.registerUser);
userRoute.route('/login').post(userControllers_1.loginUser);
userRoute.route('/logout').get(userControllers_1.logoutUser);
userRoute.route('/profile').get(authMiddleware_1.authentication, userControllers_1.currentProfile);
exports.default = userRoute;
