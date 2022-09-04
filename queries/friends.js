const knex = require('./db')
const uuid = require('uuid')

// ===============================================
// MANAGE USER DATA
// ===============================================

createFriend = payload => {
  return knex('friendships')
    .insert(payload)
    .returning('*')
    .then(result => {
      return knex('friendships')
        .join('users', 'users.id', '=', 'friendships.followee_id')
        .where('friendships.follower_id', payload.follower_id)
        .select('users.id', 'users.username', 'users.profile_pic')
        .orderBy('friendships.created_at', 'desc')
    })
}

deleteFriend = payload => {
  return knex('friendships')
    .where('follower_id', payload.follower_id)
    .andWhere('followee_id', payload.followee_id)
    .del()
    .returning('*')
    .then(result => {
      return knex('friendships')
        .join('users', 'users.id', '=', 'friendships.followee_id')
        .where('friendships.follower_id', payload.follower_id)
        .select('users.id', 'users.username', 'users.profile_pic')
        .orderBy('friendships.created_at', 'desc')
    })
}

module.exports = {
  createFriend,
  deleteFriend
}
