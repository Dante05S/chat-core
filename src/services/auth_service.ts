import Service from '.'
import type User from '../database/models/user'
import { type IUser, type UserCreation } from '../database/models/user'
import {
  BadRequestError,
  NotAuthorizedError,
  PermissionDeniedError,
  ServerError
} from '../helpers/exceptions_errors'
import UserRepository from '../repositories/user_repository'
import { getContentHtml } from '../utils/email_template'
import { generateCode } from '../utils/generate_code'
import { sendEmail } from '../utils/nodemailer_service'
import { type Login } from '../interfaces/login'
import cache from '../utils/cache'
import { createToken } from '../helpers/tokenize'
import { type UserQuery } from '../types/user_query'
import { type RequestCode } from '../types/request_code'
import bcrypt from 'bcrypt'

class AuthService extends Service<IUser, UserCreation, User, UserRepository> {
  constructor() {
    super(new UserRepository())
  }

  private async generateVerifyCode(email: string, name: string): Promise<void> {
    const codeToken = generateCode()
    const contentHtml = getContentHtml(name, codeToken)
    const [success, message] = await sendEmail(
      `'ABS Mailer' <${process.env.NODEMAILER_EMAIL ?? ''}>`,
      email,
      'Codigo de verificación de Chat.ABS()',
      contentHtml
    )
    if (!success) {
      throw new ServerError(message)
    }
    cache.set(`code_token_${email}`, codeToken)
  }

  public async register(data: UserCreation): Promise<UserQuery> {
    const user = await this.create({ ...data, email: data.email.toLowerCase() })
    await this.generateVerifyCode(user.email, user.first_name)
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  }

  public async login(data: Login): Promise<{ user: UserQuery; token: string }> {
    const email = data.email.toLowerCase()
    const keyCache = `code_token_${email}`

    const codeCache = cache.get(keyCache)
    if (codeCache === undefined) {
      throw new PermissionDeniedError('El codigo de verificación ha expirado')
    }

    if (String(codeCache) !== data.code_token) {
      throw new BadRequestError('El codigo de verificación es incorrecto')
    }

    const user = await this.repository.getUserByEmail(email)
    const token = createToken(user.id)
    cache.delete(keyCache)
    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      },
      token
    }
  }

  public async requestCode(data: RequestCode): Promise<null> {
    const user = await this.repository.getUserByEmail(data.email.toLowerCase())
    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new NotAuthorizedError('La contraseña es incorrecta')
    }

    await this.generateVerifyCode(user.email, user.first_name)
    return null
  }
}

export default AuthService
