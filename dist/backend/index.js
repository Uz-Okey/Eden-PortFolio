"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const projectRoute_1 = __importDefault(require("./routes/projectRoute"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.FRONTEND_URL, // use env variable
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
app.use('/api/user', userRoute_1.default);
app.use('/api/project', projectRoute_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
