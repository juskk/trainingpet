const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '../keys', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex')
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

  return {
    salt, hash: genHash
  }
}

function validPassword(password, hash, salt) {
  const usersHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')  
  return hash === usersHash
}

function genJWT(user) {
  const _id = user._id;
  const expiresIn = '1d'

  const payload = {
    sub: _id,
    iat: Date.now()
  }
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn, algorithm: 'RS256'})
  console.log(signedToken)

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn
  }
}

module.exports.genPassword = genPassword
module.exports.validPassword = validPassword
module.exports.genJWT = genJWT