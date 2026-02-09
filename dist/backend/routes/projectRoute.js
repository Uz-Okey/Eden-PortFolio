"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectControllers_1 = require("../controllers/projectControllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const projectControllers_2 = require("../controllers/projectControllers");
const projectRoute = express_1.default.Router();
projectRoute.route('/allProjects').get(projectControllers_1.getAllProjects);
projectRoute.route('/createProject').post(authMiddleware_1.authentication, authMiddleware_1.isAdmin, projectControllers_1.createProject);
projectRoute.route('/editProject/:id').put(authMiddleware_1.authentication, authMiddleware_1.isAdmin, projectControllers_1.editProject);
projectRoute.route('/deleteProject/:id').delete(authMiddleware_1.authentication, authMiddleware_1.isAdmin, projectControllers_1.deleteProject);
projectRoute.route('/createFav/:id').post(projectControllers_1.createFav);
projectRoute.route('/send-email').post(projectControllers_2.sendEmail);
exports.default = projectRoute;
