import { type Request } from 'express'

export enum ResponseCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_AUTHORIZED = 401,
  PERMISSION_DENIED = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500
}

type ResponseObjectData = Record<string, unknown>

type ResponseData<T = ResponseObjectData[] | ResponseObjectData | null> = T

export interface Response<T> {
  data: ResponseData<T> | null
  code: ResponseCode
  message: string
  errors: string[]
}

export const http = {
  isApplicationJson: (req: Request) => Boolean(req.is('application/json')),
  error: <T>(
    data: ResponseData<T> | null = null,
    code = ResponseCode.BAD_REQUEST,
    errors: string[] = []
  ): Response<T> => ({
    data,
    message: '',
    code,
    errors
  }),
  response: <T>(
    data: ResponseData<T> | null = null,
    code = ResponseCode.OK,
    message = ''
  ) => ({
    data,
    code,
    message,
    errors: []
  })
}
