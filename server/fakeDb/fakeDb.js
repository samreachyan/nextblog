const { portfolios, users } = require('./data')
const Portfolio = require('../database/models/portfolio')
const User = require('../database/models/user')

class FakeDb {

  async clean() {
    await Portfolio.deleteMany({})
    await User.deleteMany({})
  }

  async addData() {
    await Portfolio.create(portfolios)
    await User.create(users)
  }

  async populate() {
    await this.clean()
    await this.addData()
  }
}

module.exports = new FakeDb()