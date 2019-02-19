const sodium = require('libsodium-wrappers')

module.exports = {
  getHash,
  verifyUser
}

function getHash (password) {
  return sodium.ready.then(() =>
    sodium.crypto_pwhash_str(
      password,
      sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
      sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
    ))
}

function verifyUser (hash, password) {
  return sodium.ready.then(() =>
    sodium.crypto_pwhash_str_verify(hash, password))
}
