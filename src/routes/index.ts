import { Router } from 'express'
import { ResponseCode, http } from '../helpers/request'

const router = Router()

router.get('/', (_req, res) => {
  res.json(http.response(null, ResponseCode.OK, 'Welcome to chat-core!'))
})

export default router
