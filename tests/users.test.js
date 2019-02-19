const knex = require('knex')

const testEnv = require('./test-env')
const users = require('../server/lib/users')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('exists is true for aardvark', () => {
  return users
    .exists('aardvark', testDb)
    .then(actual => expect(actual).toBeTruthy())
})

test('exists is falsy for gnu', () => {
  return users
    .exists('gnu', testDb)
    .then(actual => expect(actual).toBeFalsy())
})

test('getById obtains correct user', () => {
  return users
    .getById(2, testDb)
    .then(user => expect(user.username).toBe('capybara'))
})

test('getByName obtains correct user', () => {
  return users
    .getByName('aardvark', testDb)
    .then(user => expect(user.id).toBe(1))
})
