const { Strategy } = require('passport-strategy')

// Strategy get options(email, password) needed to authenticate user
// Strategy gets a callback function that will contain functionality to verify an user
// Strategy has to have "authenticate" function
// Strategy has access to "error" "fail" "success" functions
class GrpahqlStrategy extends Strategy {
    constructor (verify) {
        super()

        if (!verify) {
            throw new Error('Graphql strategy requires a verify callback')
        }

        this.verify = verifiy
        this.name = 'graphql'
    }

    authenticate(_, options) {
        console.log('Calling authenticate in strategy!')

        const done = ( error, user, info ) => {
            if (error) return this.error(error)
            if (!user) return this.fail(401)
            // If user then can 'success' otherwise call 'fail' or 'error'
        }

        return this.success(user, info)
    }
}

module.exports = GrpahqlStrategy