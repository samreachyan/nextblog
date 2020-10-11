const passport = require('passport')

const authenticateUser = (options) => {
    return new Promise(( resolve, reject) => {
        console.log('Calling authentication User')
        const done = () => {
            // Here we will get user we can save session to DB
            if (err) {
                return reject(new Error(err))
            }

            if (user) {
                return resolve(user)
            } else {
                return reject(new Error('Invalid password or email'))
            }
        }
        const authFn = passport.authenticate('graphql', options, done)
        authFn()
    })
}
  
exports.buildAuthContext = () => {
    const auth = {
        authenticate: (options) => authenticateUser(options)
    }

    return auth;
}