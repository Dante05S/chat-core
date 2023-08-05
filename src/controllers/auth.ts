import { type Request, type Response } from 'express'
import AuthService from '../services/auth_service'
import { type UserCreation } from '../database/models/user'
import { http, ResponseCode, type ResponseObjectData } from '../helpers/request'
import { CustomError, getStatusByException } from '../helpers/exceptions_errors'
import { type Login } from '../interfaces/login'
import { type RequestCode } from '../types/request_code'

export const register = async (
  req: Request<ResponseObjectData, any, UserCreation>,
  res: Response
): Promise<void> => {
  try {
    const data = req.body
    const authService = new AuthService()
    const user = await authService.register(data)
    res
      .status(ResponseCode.CREATED)
      .json(
        http.response(user, ResponseCode.CREATED, 'User register successfully')
      )
  } catch (e) {
    const statusCode = getStatusByException(e)
    const data = e instanceof CustomError ? e.data : null
    res
      .status(statusCode)
      .json(http.error(data, statusCode, [(e as Error).message]))
  }
}

export const login = async (
  req: Request<ResponseObjectData, any, Login>,
  res: Response
): Promise<void> => {
  try {
    const data = req.body
    const authService = new AuthService()
    const user = await authService.login(data)
    res
      .status(ResponseCode.OK)
      .json(http.response(user, ResponseCode.OK, 'Login user Successfully'))
  } catch (e) {
    const statusCode = getStatusByException(e)
    const data = e instanceof CustomError ? e.data : null
    res
      .status(statusCode)
      .json(http.error(data, statusCode, [(e as Error).message]))
  }
}

export const requestCode = async (
  req: Request<ResponseObjectData, any, RequestCode>,
  res: Response
): Promise<void> => {
  try {
    const data = req.body
    const authService = new AuthService()
    const request = await authService.requestCode(data)
    res
      .status(ResponseCode.OK)
      .json(
        http.response(
          request,
          ResponseCode.OK,
          'Request verification code Successfully'
        )
      )
  } catch (e) {
    const statusCode = getStatusByException(e)
    const data = e instanceof CustomError ? e.data : null
    res
      .status(statusCode)
      .json(http.error(data, statusCode, [(e as Error).message]))
  }
}
