"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFav = exports.deleteProject = exports.editProject = exports.sendEmail = exports.getAllProjects = exports.createProject = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const project_1 = __importDefault(require("../models/project"));
const imagekit_1 = __importDefault(require("../imagekit"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const createProject = (0, asyncHandler_1.default)(async (req, res) => {
    const { title, description, imageBase64, category } = req.body;
    // Validate required fields
    if (!title || !description || !imageBase64 || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }
    // Validate user is authenticated
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Not authorized" });
    }
    try {
        // Upload image to imagekit
        const uploadImageUrl = await imagekit_1.default.upload({
            file: imageBase64,
            fileName: `Project_${Date.now()}.jpg`,
            folder: "/Projects",
        });
        const newProject = await project_1.default.create({
            title,
            description,
            image: uploadImageUrl.url,
            category,
            author: req.user._id,
            meta: {
                votes: 0,
                favs: 0,
                views: 0,
            },
        });
        res.status(201).json({
            message: "Project created successfully",
            project: newProject,
        });
    }
    catch (error) {
        console.error("Project creation error:", error);
        return res.status(500).json({ message: "Failed to create project" }); // ✅ Fixed
    }
});
exports.createProject = createProject;
const getAllProjects = (0, asyncHandler_1.default)(async (req, res) => {
    const allProjects = await project_1.default.find()
        .populate("author", "username")
        .sort({ createdAt: -1 });
    res.status(200).json(allProjects); // ✅ Fixed - always return 200
});
exports.getAllProjects = getAllProjects;
const editProject = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!req.user || !req.user._id)
        return res.status(401).json({ message: "Not authorized" });
    const existingProject = await project_1.default.findById(id);
    if (!existingProject)
        return res.status(404).json({ message: "Project not found" });
    const { title, description, category } = req.body;
    const updatedData = {};
    if (title !== undefined)
        updatedData.title = title;
    if (description !== undefined)
        updatedData.description = description;
    if (category !== undefined)
        updatedData.category = category;
    try {
        if (req.body.imageBase64) {
            const uploadImageurl = await imagekit_1.default.upload({
                file: req.body.imageBase64,
                fileName: `Project_${Date.now()}.jpg`,
                folder: "/Projects",
            });
            updatedData.image = uploadImageurl.url;
        }
        const updatedProject = await project_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        }).populate("author", "username");
        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });
    }
    catch (error) {
        console.error("Project update error:", error);
        return res.status(500).json({ message: "Failed to update project" });
    }
});
exports.editProject = editProject;
const deleteProject = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!req.user || !req.user._id)
        return res.status(401).json({ message: "Not authorized" });
    const existingProject = await project_1.default.findById(id);
    if (!existingProject) {
        return res.status(404).json({ message: "Project not found" });
    }
    await project_1.default.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted successfully" });
});
exports.deleteProject = deleteProject;
const createFav = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Invalid project id" });
    }
    const project = await project_1.default.findById(id);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    const updateProject = await project_1.default.findByIdAndUpdate(id, { $inc: { "meta.favs": 1 } }, { new: true });
    res.status(200).json({ message: "successful", project: updateProject });
});
exports.createFav = createFav;
const sendEmail = (0, asyncHandler_1.default)(async (req, res) => {
    const { name, message, contact, email } = req.body;
    if (!name || !message || !contact || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mail = await transporter.sendMail({
        from: `"Eden" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New message from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Contact: ${contact}
Message: ${message}
 `,
    });
    res.status(200).json({ message: "Email sent successfully", mail });
});
exports.sendEmail = sendEmail;
