
import mongoose from "mongoose";
const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log("Connected to MongoDB Successfully 👍👍")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1)
    }
}

export default ConnectDb;