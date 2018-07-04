module.exports = {
  port: process.env.PORT || 3000,
  dbURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/cats-database-with-login'
}
