import express from 'express'
import dotenv from 'dotenv'
import ConnectDb from './config/db'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute'
import projectRoute from './routes/projectRoute'
import cors from 'cors'

dotenv.config()
ConnectDb()
const app = express()

app.use(
  cors({
    credentials: true,
    origin: "https://edenport-folio.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())

app.use('/api/user', userRoute)
app.use('/api/project', projectRoute)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))