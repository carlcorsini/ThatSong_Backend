exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Carl',
          last_name: 'Corsini',
          username: 'username1',
          email: 'carl.c.1192@gmail.com',
          hashedPassword: 'password'
        },
        {
          id: 2,
          first_name: 'Jon',
          last_name: 'Riemer',
          username: 'username2',
          email: 'jriemer@gmail.com',
          hashedPassword:
            '$2b$10$XHKm7JBcdYyawcgCr3xyP.RUXaFaLV9TQhkvSWGi58Wj4/9GH4guy'
        },
        {
          id: 3,
          first_name: 'Glen',
          last_name: 'Pegado',
          email: 'glenpgd@gmail.com',
          username: 'username3',
          hashedPassword: 'hashedPassword'
        },
        {
          id: 4,
          first_name: 'Panda',
          last_name: 'Bear',
          email: 'panda@gmail.com',
          username: 'username4',
          hashedPassword: 'hashedPassword'
        },
        {
          id: 5,
          first_name: 'Tom',
          last_name: 'Myspace',
          email: 'tom@myspace.com',
          username: 'username5',
          hashedPassword: 'hashedPassword'
        },
        {
          id: 6,
          first_name: 'Michael',
          last_name: 'Corleon',
          email: 'michael.Corleon@gmail.com',
          username: 'username6',
          hashedPassword: 'hashedPassword'
        }
      ])
    })
    .then(() =>
      knex.raw(
        `SELECT setval('"users_id_seq"', (SELECT MAX("id") FROM "users"))`
      )
    )
}
