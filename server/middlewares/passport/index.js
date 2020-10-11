const passport = require('passport')
const GraphqlStrategy = require('./strategies')

exports.init = (passport) => {
    passport.use('graphql', GraphqlStrategy((options, done) => {
        console.log('calling verify function strategy')
        // 1. Find user in DB and if use exists verify password
        // 2. If use is verify call 'done'

        if (true) {
            // first param of done is reserved for 'error', second one for 'user'
            done();
        }
    }))
}