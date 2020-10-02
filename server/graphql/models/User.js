class User {
    constructor(model) {
      this.Model = model;
    }
  
    signIn(signInData, ctx) {
      const isAuthenticated = ctx.authenticate(signInData)

      if (isAuthenticated) {
        console.log('User authenticated')
      }

      return 'Sign in output'
    }
  
    signUp(signUpData) {
      if (signUpData.password !== signUpData.passwordConfirmation) {
        throw new Error('Password must be the same as confirmation password!');
      }
  
      return this.Model.create(signUpData);
    }
  
    signOut() {
      return 'Signing Out...';
    }
  }
  
module.exports = User;