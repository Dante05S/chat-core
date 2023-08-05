import { type IUser } from '../database/models/user'
type ExcludeKeyOf = 'created_at' | 'updated_at' | 'deleted_at' | 'password'

export type UserQuery = Pick<IUser, Exclude<keyof IUser, ExcludeKeyOf>>
