import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import Project from "../models/project";
import imagekit from "../imagekit";
import nodemailer from "nodemailer";

interface AuthRequest extends Request {
  user?: any;
}

const createProject = asyncHandler(async (req: AuthRequest, res: Response) => {
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
    const uploadImageUrl = await imagekit.upload({
      file: imageBase64,
      fileName: `Project_${Date.now()}.jpg`,
      folder: "/Projects",
    });

    const newProject = await Project.create({
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
  } catch (error) {
    console.error("Project creation error:", error);
    return res.status(500).json({ message: "Failed to create project" }); // ✅ Fixed
  }
});

const getAllProjects = asyncHandler(async (req: AuthRequest, res: Response) => {
  const allProjects = await Project.find()
    .populate("author", "username")
    .sort({ createdAt: -1 });

  res.status(200).json(allProjects); // ✅ Fixed - always return 200
});

const editProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (!req.user || !req.user._id)
    return res.status(401).json({ message: "Not authorized" });

  const existingProject = await Project.findById(id);
  if (!existingProject)
    return res.status(404).json({ message: "Project not found" });

  const { title, description, category } = req.body;

  const updatedData: any = {};
  if (title !== undefined) updatedData.title = title;
  if (description !== undefined) updatedData.description = description;
  if (category !== undefined) updatedData.category = category;

  try {
    if (req.body.imageBase64) {
      const uploadImageurl = await imagekit.upload({
        file: req.body.imageBase64,
        fileName: `Project_${Date.now()}.jpg`,
        folder: "/Projects",
      });
      updatedData.image = uploadImageurl.url;
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).populate("author", "username");

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Project update error:", error);
    return res.status(500).json({ message: "Failed to update project" });
  }
});

const deleteProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (!req.user || !req.user._id)
    return res.status(401).json({ message: "Not authorized" });

  const existingProject = await Project.findById(id);
  if (!existingProject) {
    return res.status(404).json({ message: "Project not found" });
  }

  await Project.findByIdAndDelete(id);

  res.status(200).json({ message: "Project deleted successfully" });
});

const createFav = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {id} = req.params;
  if(!id){
    return res.status(400).json({message: "Invalid project id"});
  }

  const project = await Project.findById(id);
  if(!project){
    return res.status(404).json({message: "Project not found"});
  }
  const updateProject = await Project.findByIdAndUpdate(id,{$inc:{"meta.favs": 1}},{new: true})

  res.status(200).json({message:"successful", project: updateProject })
})



const sendEmail = asyncHandler(async (req, res) => {
 const { name, message, contact, email } = req.body;
 if (!name || !message || !contact || !email ) {
   return res.status(400).json({ message: "All fields are required" });
 }

 const transporter = nodemailer.createTransport({
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


export { createProject, getAllProjects, sendEmail, editProject, deleteProject, createFav };
