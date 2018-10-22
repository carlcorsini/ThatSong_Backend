exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('songs')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('songs').insert([
        {
          id: 1,
          timestamp: '12:27',
          title: 'The Moisture Manifesto: A Study By Sweat Michaels',
          artist: 'McSneako',
          user_id: 1,
          url: '/mcsneako/the-moisture-manifesto-a-study-by-sweat-michaels',
          notes: 'notes'
        },
        {
          id: 2,
          timestamp: '06:54',
          title: 'The Moisture Manifesto: A Study By Sweat Michaels',
          artist: 'McSneako',
          user_id: 1,
          url: '/mcsneako/the-moisture-manifesto-a-study-by-sweat-michaels',
          notes: 'notes'
        },
        {
          id: 3,
          timestamp: '20:27',
          title: 'The Moisture Manifesto: A Study By Sweat Michaels',
          artist: 'McSneako',
          user_id: 2,
          url: '/mcsneako/the-moisture-manifesto-a-study-by-sweat-michaels',
          notes: 'notes'
        },
        {
          id: 4,
          timestamp: '2:27',
          title: 'The Moisture Manifesto: A Study By Sweat Michaels',
          artist: 'McSneako',
          user_id: 2,
          url: '/mcsneako/the-moisture-manifesto-a-study-by-sweat-michaels',
          notes: 'notes'
        },
        {
          id: 5,
          timestamp: '3:37',
          title: 'The Moisture Manifesto: A Study By Sweat Michaels',
          artist: 'McSneako',
          user_id: 3,
          url: '/mcsneako/the-moisture-manifesto-a-study-by-sweat-michaels',
          notes: 'notes'
        },
        {
          id: 6,
          timestamp: '21:56',
          title: 'The Moisture Manifesto: A Study By Sweat Michaels',
          artist: 'McSneako',
          user_id: 3,
          url: '/mcsneako/the-moisture-manifesto-a-study-by-sweat-michaels',
          notes: 'notes'
        }
      ])
    })
    .then(() =>
      knex.raw(
        `SELECT setval('"songs_id_seq"', (SELECT MAX("id") FROM "songs"))`
      )
    )
}
