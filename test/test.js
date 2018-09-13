require('dotenv').load()
const chai = require('chai')
const expect = chai.expect
const users = require('../src/models/users')
const songs = require('../src/models/songs')
const config = require('../knexfile').test
chai.use(require('chai-as-promised'))

const data = {
  id: 5,
  user_id: 1,
  amount: 500,
  last_day_of_pay_period: '2018-04-04'
}
const updateData = {
  id: 1,
  user_id: 1,
  amount: 750,
  last_day_of_pay_period: '2018-04-24'
}

describe('thatSong', function() {
  before(function() {
    const tmpConnection = require('knex')({
      client: 'pg',
      connection: config.connection
    })
    return tmpConnection
      .raw(`CREATE DATABASE ${config.connection.database};`)
      .catch(err => {
        // console.log(errr);
        Promise.resolve('Everything is OK')
      })
      .then(() => (global.knex = require('../queries/db')))
      .then(() => knex.migrate.rollback())
      .then(() => knex.migrate.latest(config))
      .then(() => knex.seed.run())
      .catch(() => console.log(`Migrations or seeds failed.`))
  })

  describe('#getAllUsers()', function() {
    it('should return a list of all the users in the database', function() {
      return users.getAllUsers().then(result => {
        expect(result.length).to.equal(6)

        const user = result[0]
        expect(user.id).to.be.ok
        expect(user.first_name).to.be.ok
      })
    })
  })

  describe('#getUserById()', function() {
    it('should return one user from the database', function() {
      return users.getUserById(1).then(result => {
        expect(result.id).to.be.ok
        expect(result.id).to.equal(1)
        expect(result.first_name).to.equal('Carl')
        expect(result.last_name).to.equal('Corsini')
      })
    })
  })

  describe('#getUserByUsername()', function() {
    it('should return one user from the database', function() {
      return users.getUserByUsername('djshmarl').then(result => {
        expect(result.id).to.be.ok
        expect(result.id).to.equal(1)
        expect(result.first_name).to.equal('Carl')
        expect(result.last_name).to.equal('Corsini')
      })
    })
  })

  const updateUserData = { first_name: 'jerry', last_name: 'garcia' }

  describe('#updateUser()', function() {
    it('should update one user from the database', function() {
      return users.updateUser(1, updateUserData).then(result => {
        const user = result[0]
        expect(user.id).to.equal(1)
        expect(user.first_name).to.equal('jerry')
        expect(user.last_name).to.equal('garcia')
      })
    })
  })

  const createUserData = {
    first_name: 'john',
    last_name: 'jerry',
    email: 'john@jerry.jerry',
    username: 'heresjohnny',
    password: 'Awesome1!!'
  }

  describe('#createUser()', function() {
    it('should create one user from the database', function() {
      return users.createUser(createUserData).then(result => {
        const user = result[0]
        expect(user.id).to.equal(7)
        expect(user.first_name).to.equal('john')
        expect(user.last_name).to.equal('jerry')
      })
    })
  })

  describe('#getUserSongs()', function() {
    it('should return a list of all the songs belonging to one user in the database', function() {
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

  describe('#getUserFriends()', function() {
    it('should return a list of all the friends belonging to one user in the database', function() {
      return users.getUserFriends(1).then(result => {
        expect(result.length).to.equal(3)

        const data = result[0]
        expect(data.id).to.be.ok
      })
    })
  })

  describe('#deleteUser()', function() {
    it('should delete one user from the database', function() {
      return users.deleteUser(1).then(result => {
        const user = result[0]
        expect(user.id).to.equal(1)
        expect(user.first_name).to.equal('jerry')
        expect(user.last_name).to.equal('garcia')
      })
    })
  })

  describe('#getAllSongs()', function() {
    it('should return a list of all the songs in the database', function() {
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

  //
  //   describe('#getEarningsByUserId()', function() {
  //     it('should return one earning from the database', function() {
  //       return earnings.getEarningsByUserId(1).then(result => {
  //         expect(result.length).to.equal(2)
  //
  //         const data = result[0]
  //         expect(data.id).to.be.ok
  //         expect(data.last_day_of_pay_period).to.be.ok
  //       })
  //     })
  //   })
  //
  //   describe('#createEarnings()', function() {
  //     it('should create one earning in the database', function() {
  //       return earnings.createEarnings(data).then(result => {
  //         expect(result.length).to.equal(1)
  //
  //         const data = result[0]
  //         expect(data.id).to.be.ok
  //         expect(data.amount).to.equal(500)
  //         expect(data.last_day_of_pay_period).to.be.ok
  //         // expect(data.last_day_of_pay_period).to.equal('Wed, 04 Apr 2018 07:00:00 GMT')
  //       })
  //     })
  //   })
  //
  //   describe('#updateEarnings()', function() {
  //     it('should update one earning from the database', function() {
  //       return earnings.updateEarnings(1, updateData).then(result => {
  //         expect(result.length).to.equal(1)
  //
  //         const data = result[0]
  //         expect(data.id).to.be.ok
  //         expect(data.last_day_of_pay_period).to.be.ok
  //       })
  //     })
  //   })
  //
  //   describe('#deleteEarnings()', function() {
  //     it('should delete one earning from the database', function() {
  //       return earnings.deleteEarnings(1).then(result => {
  //         expect(result.length).to.equal(1)
  //
  //         const data = result[0]
  //         expect(data.id).to.be.ok
  //         expect(data.last_day_of_pay_period).to.be.ok
  //       })
  //     })
  //   })
})
