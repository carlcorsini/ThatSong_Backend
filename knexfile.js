module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'thatSong'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'pg',
    connection:
      'postgres://hnvtctzpywiujn:2937e5a14d4dacda9e53c64eec494bd24f84911f9dd7d605f5461e6258e72029@ec2-54-235-86-226.compute-1.amazonaws.com:5432/dcpds7vg55uoo4',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'thatSong_test'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
}
