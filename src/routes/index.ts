import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ data: null, code: 200 })
})

export default router
