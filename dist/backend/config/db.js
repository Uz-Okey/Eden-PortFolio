"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ConnectDb = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB Successfully 👍👍");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
exports.default = ConnectDb;
