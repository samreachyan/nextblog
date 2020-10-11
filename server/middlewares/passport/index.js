const passport = require('passport')
const GraphqlStrategy = require('./strategies')
const User = require('../../database/models/user')

exports.init = (passport) => {
    passport.use('graphql', GraphqlStrategy((options, done) => {
        User.findOne({ email}, (error, user) => {
            if (error) return done(error)
            if (!user) return done(null, false)
        })
        // 1. Find user in DB and if use exists verify password
        // 2. If use is verify call 'done'

        return done(null, user)
    }))
}