import { BaseSchema } from '@adonisjs/lucid/schema';

export default class TagsMigration extends BaseSchema {
  protected tableName = 'tags';

  // eslint-disable-next-line @typescript-eslint/require-await
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable();
      table.uuid('uuid').notNullable().unique();

      table.string('name').notNullable(); // Nom du tag

      table.timestamp('created_at').notNullable().defaultTo(this.now());
      table.timestamp('updated_at').notNullable().defaultTo(this.now());
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down() {
    this.schema.dropTable(this.tableName);
  }
}
