import { Router } from 'express'
import { register, login, requestCode } from '../../controllers/auth'
import { contentType } from '../../middlewares/content_type'
import { validateBody } from '../../middlewares/validateBody'
import {
  validateRegisterSchema,
  validateLoginSchema,
  validateRequestCodeSchema
} from '../../validators/auth_validator'

const router = Router()

router.post(
  '/register',
  contentType,
  validateBody(validateRegisterSchema()),
  register
)
router.post('/login', contentType, validateBody(validateLoginSchema()), login)
router.post(
  '/request-code',
  contentType,
  validateBody(validateRequestCodeSchema()),
  requestCode
)

export default router
