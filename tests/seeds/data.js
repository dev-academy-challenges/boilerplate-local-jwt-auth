const crypto = require('../../server/lib/crypto')

exports.seed = (knex, Promise) => {
  return Promise.all([
    crypto.getHash('aardvark'),
    crypto.getHash('capybara')
  ])
  .then(([aardvarkHash, capybaraHash]) => {
    return knex('users').del()
      .then(() => {
        return knex('users').insert([
          { id: 1, username: 'aardvark', hash: aardvarkHash },
          { id: 2, username: 'capybara', hash: capybaraHash }
        ])
      })
  })
  .catch(err => console.error('Unable to seed database', err))
}
