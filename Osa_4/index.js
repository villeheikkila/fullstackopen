const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})