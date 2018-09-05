exports.up = function(knex, Promise) {
  return knex.schema.createTable('songs', function(table) {
    table.increments()
    table.string('timestamp').notNullable()
    table.string('title').notNullable()
    table.integer('user_id').notNullable()
    table.string('url').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('songs')
}
