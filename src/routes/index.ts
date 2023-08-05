import { Router } from 'express'
import authRouter from './api/auth'
import { ResponseCode, http } from '../helpers/request'

const router = Router()

router.use('/auth', authRouter)

router.get('/', (_req, res) => {
  res.json(http.response(null, ResponseCode.OK, 'Welcome to Chat Core!'))
})

export default router
