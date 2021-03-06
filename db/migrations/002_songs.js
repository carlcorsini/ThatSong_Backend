exports.up = function(knex, Promise) {
  return knex.schema.createTable('songs', function(table) {
    table.increments()
    table.string('timestamp').notNullable()
    table.string('title').notNullable()
    table.string('artist').notNullable()
    table
      .integer('user_id')
      .references('users.id')
      .onDelete('cascade')
    table.string('url').notNullable()
    table.string('notes')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('songs')
}
