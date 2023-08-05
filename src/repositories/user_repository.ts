import Repository from '.'
import User from '../database/models/user'
import { type IUser, type UserCreation } from '../database/models/user'
import { NotFoundError } from '../helpers/exceptions_errors'
import { type UserQuery } from '../types/user_query'

export default class UserRepository extends Repository<
  IUser,
  UserCreation,
  User
> {
  constructor() {
    super(User)
  }

  public async getUserByEmail(email: string): Promise<UserQuery> {
    const user = await this.getOne({
      where: {
        email
      },
      attributes: {
        exclude: ['created_at', 'updated_at', 'deleted_at', 'password']
      }
    })

    if (user === null) {
      throw new NotFoundError(`El usuario con este email (${email}) no existe`)
    }
    return user.dataValues
  }
}
