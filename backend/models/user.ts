import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true, select: false, minlength: 6},
  email: { type: String, lowercase: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'], required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
},{timestamps:true});

const User = mongoose.model('User', userSchema);
// ready to go!

export default User;