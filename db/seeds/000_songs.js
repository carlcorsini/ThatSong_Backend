exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('songs')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('songs').insert([
        {
          id: 1,
          timestamp: '12:27',
          title: 'The Moisture Manifesto: A Study By Sweat Michaels',
          user_id: 1,
          url: '/mcsneako/the-moisture-manifesto-a-study-by-sweat-michaels'
        },
        {
          id: 2,
          timestamp: '06:54',
          title: 'The Moisture Manifesto: A Study By Sweat Michaels',
          user_id: 1,
          url: '/mcsneako/the-moisture-manifesto-a-study-by-sweat-michaels'
        },
        {
          id: 3,
          timestamp: '20:27',
          title: 'The Moisture Manifesto: A Study By Sweat Michaels',
          user_id: 1,
          url: '/mcsneako/the-moisture-manifesto-a-study-by-sweat-michaels'
        }
      ])
    })
    .then(() =>
      knex.raw(
        `SELECT setval('"songs_id_seq"', (SELECT MAX("id") FROM "songs"))`
      )
    )
}
