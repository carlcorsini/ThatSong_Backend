exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments()
    table.text('first_name').notNullable()
    table.text('last_name').notNullable()
    table.text('username').notNullable()
    table
      .text('email')
      .notNullable()
      .unique()
    table.text('hashedPassword', 'char(16)').notNullable()
    table.text('profile_pic').defaultTo('')
    table.text('location').defaultTo('')
    table.text('bio').defaultTo('')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
