/** @format */

import { Router } from 'express'

import loginRouter from './login'
import registerRouter from './register'

const router = Router()

router.use('/login', loginRouter)
router.use('/register', registerRouter)

export default router
