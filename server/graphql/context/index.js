const passport = require('passport')

const authenticateUser = (req, options) => {
    return new Promise(( resolve, reject) => {
        console.log('Calling authentication User')
        const done = () => {
            // Here we will get user we can save session to DB
            if (err) {
                return reject(new Error(err))
            }

            if (user) {
                req.helloWorld()
                return resolve(user)
            } else {
                return reject(new Error('Invalid password or email'))
            }
        }
        const authFn = passport.authenticate('graphql', options, done)
        authFn()
    })
}
  
exports.buildAuthContext = (req) => {
    const auth = {
        authenticate: (options) => authenticateUser(req, options)
    }

    return auth;
}