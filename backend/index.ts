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

// ✅ Allow both local and production frontends
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://edenport-folio.vercel.app'
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('❌ Blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
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
app.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`))