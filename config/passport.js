//const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

const authSec = process.env.authSecret || authSecret

module.exports = app => {
    const params = {
        secretOrKey: authSec,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => {
                if (user) {
                    done(null, { id: user.id, email: user.email })
                } else {
                    done(null, false)
                }
            })
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}