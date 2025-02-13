import express from 'express'
import { registerController, loginController } from '../controllers/authController.js'

const router = express.Router()

router.use('/login', loginController )
router.use('/register', registerController )


export default router