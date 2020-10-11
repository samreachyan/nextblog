const passport = require('passport')
const GraphqlStrategy = require('./strategies')
const User = require('../../database/models/user')
const user = require('../../database/models/user')

exports.init = (passport) => {
    passport.use('graphql', GraphqlStrategy((options, password, done) => {
        User.findOne({ email}, (error, user) => {
            if (error) return done(error)
            if (!user) return done(null, false)
        })
        // 1. Find user in DB and if use exists verify password
        // 2. If use is verify call 'done'

        user.validatePassword(password, (error, isMatching) => {
            if (error) return done(error)
            if (!isMatching) return done(null, false)

            return done(null, user)
        })
    }))
}