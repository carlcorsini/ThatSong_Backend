const chai = require('chai')
const expect = chai.expect
const users = require('../src/models/users')
const usersControllers = require('../src/controllers/users')
const songs = require('../src/models/songs')
const friends = require('../src/models/friends')
const Response = require('./response')
const config = require('../knexfile').test
chai.use(require('chai-as-promised'))

describe('ThatSong', () => {
  before(() => {
    const tmpConnection = require('knex')({
      client: 'pg',
      connection: config.connection
    })
    return tmpConnection
      .raw(`CREATE DATABASE ${config.connection.database};`)
      .catch(err => {
        Promise.resolve('Everything is OK')
      })
      .then(() => (global.knex = require('../queries/db')))
      .then(() => knex.migrate.rollback())
      .then(() => knex.migrate.latest(config))
      .then(() => knex.seed.run())
      .catch(() => console.log(`Migrations or seeds failed.`))
  })
})

describe('thatSong', () => {
  before(() => {
    const tmpConnection = require('knex')({
      client: 'pg',
      connection: config.connection
    })
    return tmpConnection
      .raw(`CREATE DATABASE ${config.connection.database};`)
      .catch(err => {
        Promise.resolve('Everything is OK')
      })
      .then(() => (global.knex = require('../queries/db')))
      .then(() => knex.migrate.rollback())
      .then(() => knex.migrate.latest(config))
      .then(() => knex.seed.run())
      .catch(() => console.log(`Migrations or seeds failed.`))
  })

  describe('#getAllUsers()', () => {
    it('should return a list of all the users in the database', () => {
      return users.getAllUsers().then(result => {
        expect(result.length).to.equal(6)

        const user = result[0]
        expect(user.id).to.be.ok
        expect(user.first_name).to.equal('Carl')
      })
    })
  })

  describe('#getUserById()', () => {
    it('should return one user from the database', () => {
      return users.getUserById(1).then(result => {
        expect(result.id).to.be.ok
        expect(result.id).to.equal(1)
        expect(result.first_name).to.equal('Carl')
        expect(result.last_name).to.equal('Corsini')
      })
    })
  })

  describe('#getUserByUsername()', () => {
    it('should return one user from the database', () => {
      return users.getUserByUsername('djshmarl').then(result => {
        expect(result.id).to.be.ok
        expect(result.id).to.equal(1)
        expect(result.first_name).to.equal('Carl')
        expect(result.last_name).to.equal('Corsini')
      })
    })
  })

  const loginUserData = {
    body: {
      username: 'djshmarl',
      password: 'yahoo'
    }
  }

  const res = new Response()

  describe('#loginUser()', () => {
    it('should login one user and return a request body', () => {
      return usersControllers.loginUser(loginUserData, res).then(result => {
        expect(user.client).to.be.ok
      })
    })
  })

  const updateUserData = { first_name: 'jerry', last_name: 'garcia' }

  describe('#updateUser()', () => {
    it('should update one user from the database', () => {
      return users.updateUser(1, updateUserData).then(result => {
        const user = result[0]
        expect(user.id).to.equal(1)
        expect(user.first_name).to.equal('jerry')
        expect(user.last_name).to.equal('garcia')
      })
    })
  })

  const createUserData = {
    first_name: 'barry ',
    last_name: 'bonds',
    email: 'john@jerry.jerry',
    username: 'heresjohnny',
    password: 'Password123!'
  }

  describe('#createUser()', () => {
    it('should create one user from the database', () => {
      return users.createUser(createUserData).then(result => {
        const user = result[0]
        expect(user.id).to.equal(7)
        expect(user.first_name).to.equal('barry')
        expect(user.last_name).to.equal('bonds')
      })
    })
  })

  describe('#getUserSongs()', () => {
    it('should return a list of all the songs belonging to one user in the database', () => {
      return users.getUserSongs(1).then(result => {
        expect(result.length).to.equal(2)

        const data = result[0]
        expect(data.id).to.be.ok
        expect(data.title).to.equal(
          'The Moisture Manifesto: A Study By Sweat Michaels'
        )
        expect(data.artist).to.equal('McSneako')
      })
    })
  })

  describe('#getFollowers()', () => {
    it('should return a list of all the friends belonging to one user in the database', () => {
      return users.getFollowers(1).then(result => {
        expect(result.length).to.equal(3)

        const data = result[0]
        expect(data.id).to.be.ok
      })
    })
  })

  describe('#deleteUser()', () => {
    it('should delete one user from the database', () => {
      return users.deleteUser(1).then(result => {
        const user = result[0]
        expect(user.id).to.equal(2)
        expect(user.first_name).to.equal('Jon')
        expect(user.last_name).to.equal('Riemer')
      })
    })
  })

  describe('#getAllSongs()', () => {
    it('should return a list of all the songs in the database', () => {
      return songs.getAllSongs().then(result => {
        expect(result.length).to.equal(4)

        const data = result[0]
        expect(data.id).to.be.ok
        expect(data.title).to.equal(
          'The Moisture Manifesto: A Study By Sweat Michaels'
        )
        expect(data.artist).to.equal('McSneako')
      })
    })
  })

  const createSongData = {
    timestamp: '14:27',
    title: 'this is a title',
    artist: 'test artist',
    url: '/test/the-testo-manifesto',
    notes: 'this is a note',
    user_id: 3
  }

  describe('#createSong()', () => {
    it('should create one song in the database', () => {
      return songs.createSong(createSongData).then(result => {
        const song = result[0]

        expect(song.id).to.equal(7)
        expect(song.title).to.equal('this is a title')
        expect(song.artist).to.equal('test artist')
        expect(song.url).to.equal('/test/the-testo-manifesto')
        expect(song.notes).to.equal('this is a note')
        expect(song.user_id).to.equal(3)
      })
    })
  })

  describe('#deleteSong()', () => {
    it('should delete one song in the database', () => {
      return songs.deleteSong(7).then(result => {
        expect(result.length).to.equal(4)
        const song = result[0]
        expect(song.title).to.equal(
          'The Moisture Manifesto: A Study By Sweat Michaels'
        )
        expect(song.artist).to.equal('McSneako')
        expect(song.url).to.equal(
          '/mcsneako/the-moisture-manifesto-a-study-by-sweat-michaels'
        )
        expect(song.notes).to.equal('notes')
        expect(song.user_id).to.equal(2)
      })
    })
  })

  const friendData = {
    follower_id: 3,
    followee_id: 2
  }

  describe('#deleteFriend()', () => {
    it('should delete one friend in the database', () => {
      return friends.deleteFriend(friendData).then(result => {
        expect(result.length).to.equal(1)
        const friend = result[0]
      })
    })
  })

  describe('#createFriend()', () => {
    it('should create one friend in the database', () => {
      return friends.createFriend(friendData).then(result => {
        expect(result.length).to.equal(2)
        const friend = result[0]
      })
    })
  })
})
