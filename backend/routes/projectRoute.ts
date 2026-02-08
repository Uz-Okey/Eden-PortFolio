import express from 'express'
import { createFav, createProject, deleteProject, editProject, getAllProjects } from '../controllers/projectControllers'
import { authentication, isAdmin } from '../middlewares/authMiddleware'
import { sendEmail } from '../controllers/projectControllers'

const projectRoute = express.Router()

projectRoute.route('/allProjects').get( getAllProjects)
projectRoute.route('/createProject').post(authentication, isAdmin ,createProject)
projectRoute.route('/editProject/:id').put(  authentication, isAdmin , editProject)
projectRoute.route('/deleteProject/:id').delete(authentication, isAdmin , deleteProject)
projectRoute.route('/createFav/:id').post(createFav)
projectRoute.route('/send-email').post(sendEmail)
export default projectRoute;