import express from 'express'
import { currentProfile, loginUser, logoutUser, registerUser } from '../controllers/userControllers'
import { authentication } from '../middlewares/authMiddleware'


const userRoute = express.Router()

userRoute.route('/register').post(registerUser)
userRoute.route('/login').post(loginUser)
userRoute.route('/logout').get(logoutUser)
userRoute.route('/profile').get(authentication, currentProfile)

export default userRoute;