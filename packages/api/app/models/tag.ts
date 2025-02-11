import type { HasMany } from '@adonisjs/lucid/types/relations';
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import { v7 } from 'uuid';

import Todo from '#models/todo';

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare uuid: string;

  @column()
  declare name: string;

  @hasMany(() => Todo)
  declare todos: HasMany<typeof Todo>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  constructor() {
    super();
    this.uuid = v7();
  }
}
