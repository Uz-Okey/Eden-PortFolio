import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, required: true, trim: true }, // String is shorthand for {type: String}
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", blogSchema);
// ready to go!

export default Project;
