"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const blogSchema = new Schema({
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, required: true, trim: true }, // String is shorthand for {type: String}
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    category: {
        type: String,
        required: true,
        enum: [
            "Business Cards",
            "Book Designs",
            "Flyers",
            "Logo Designs",
            "Packaging Designs",
            "Branding Identity",
            "Social Media Designs",
            "Others",
        ],
    },
    meta: {
        votes: { type: Number, default: 0 },
        favs: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
    },
}, { timestamps: true });
const Project = mongoose_1.default.model("Project", blogSchema);
// ready to go!
exports.default = Project;
