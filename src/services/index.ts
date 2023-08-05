import type Repository from '../repositories'
import { type BaseModelAttributes } from '../interfaces/base_model_attributes'
import { type BaseModelCreation } from '../types/base_model_creation'
import {
  type Attributes,
  type WhereAttributeHash,
  type Model,
  type Optional
} from 'sequelize'
import { NotFoundError } from '../helpers/exceptions_errors'
import { type MakeNullishOptional } from 'sequelize/types/utils'
import { type ValuesUpdate } from '../types/values_update'

export default class Service<
  TAttributes extends BaseModelAttributes,
  TCreation extends Optional<TAttributes, BaseModelCreation>,
  T extends Model<TAttributes, TCreation>,
  R extends Repository<TAttributes, TCreation, T>
> {
  protected repository: R
  constructor(repository: R) {
    this.repository = repository
  }

  /*
   * -----------------------------------------------------------------------
   * Crea un nuevo registro de un modelo
   *
   * -----------------------------------------------------------------------
   */
  async create(
    body: MakeNullishOptional<T['_creationAttributes']>
  ): Promise<T> {
    const data = await this.repository.create(body)
    return data
  }

  /*
   * -----------------------------------------------------------------------
   * Obtiene un array de resultados con todos los registros del modelo
   *
   * -----------------------------------------------------------------------
   */
  async getAll(): Promise<T[]> {
    return await this.repository.getAll()
  }

  /*
   * -----------------------------------------------------------------------
   * Obtiene los resultados de un modelo específico según su UUID
   *
   * -----------------------------------------------------------------------
   */
  async get(id: string, message: string): Promise<T> {
    const data = await this.repository.getById(id)

    // Valida si la data existe
    if (data === null) {
      throw new NotFoundError(message)
    }
    return data
  }

  /*
   * -----------------------------------------------------------------------
   * Actualiza un registro de un modelo
   *
   * -----------------------------------------------------------------------
   */
  async update(id: string, body: ValuesUpdate<T>, message: string): Promise<T> {
    // Find the data
    await this.get(id, message)

    // Update data
    const data = await this.repository.update(
      id as unknown as WhereAttributeHash<Attributes<T>['id']>,
      body
    )
    return data[1][0]
  }

  /*
   * -----------------------------------------------------------------------
   * Elimina un modelo por su id
   *
   * -----------------------------------------------------------------------
   */
  async remove(id: string, message: string): Promise<void> {
    // Find the data
    await this.get(id, message)

    // Remove data
    await this.repository.remove(
      id as unknown as WhereAttributeHash<Attributes<T>['id']>
    )
  }
}
