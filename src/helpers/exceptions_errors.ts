import { UniqueConstraintError } from 'sequelize'
import { ResponseCode, type ResponseObjectData } from '../helpers/request'

export class CustomError extends Error {
  data: ResponseObjectData | null
  status: ResponseCode
  constructor(
    message: string,
    name: string,
    status: ResponseCode,
    data: ResponseObjectData | null = null
  ) {
    super(message)
    this.name = name
    this.status = status
    this.message = message
    this.data = data
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string, data: ResponseObjectData | null = null) {
    super(message, 'BAD_REQUEST', ResponseCode.BAD_REQUEST, data)
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, data: ResponseObjectData | null = null) {
    super(message, 'NOT_FOUND', ResponseCode.NOT_FOUND, data)
  }
}

export class ServerError extends CustomError {
  constructor(message: string, data: ResponseObjectData | null = null) {
    super(message, 'SERVER_ERROR', ResponseCode.SERVER_ERROR, data)
  }
}

export class ConflictError extends CustomError {
  constructor(message: string, data: ResponseObjectData | null = null) {
    super(message, 'CONFLICT', ResponseCode.CONFLICT, data)
  }
}

export class PermissionDeniedError extends CustomError {
  constructor(message: string, data: ResponseObjectData | null = null) {
    super(message, 'PERMISSION_DENIED', ResponseCode.PERMISSION_DENIED, data)
  }
}

export const getStatusByException = (e: unknown): ResponseCode => {
  if (e instanceof CustomError) {
    return e.status
  }
  if (e instanceof UniqueConstraintError) {
    return ResponseCode.BAD_REQUEST
  }
  return ResponseCode.SERVER_ERROR
}