const sodium = require('libsodium-wrappers')

const crypto = require('../server/lib/crypto')

test('getHash returns verifiable hash in buffer', () => {
  const password = 'password'
  return crypto.getHash(password)
    .then(hash => sodium.crypto_pwhash_str_verify(hash, password))
    .then(isValid => {
      expect(isValid).toBeTruthy()
    })
})

test('verifyUser verifies user with correct password', () => {
  return sodium.ready.then(() => {
    return sodium.crypto_pwhash_str(
      'aardvark',
      sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
      sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
    )
  })
  .then(hash => {
    crypto.verifyUser(hash, 'aardvark')
      .then(isValid => {
        expect(isValid).toBeTruthy()
      })
  })
})

test('verifyUser does not veryfiy user with incorrect password', () => {
  return sodium.ready.then(() => {
    return sodium.crypto_pwhash_str(
      'aardvark',
      sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
      sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
    )
  })
  .then(hash => {
    crypto.verifyUser(hash, 'wrong password')
      .then(isValid => {
        expect(isValid).toBeFalsy()
      })
  })
})
