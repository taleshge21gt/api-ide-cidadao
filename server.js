const jsonServer = require('json-server')

const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router('/tmp/db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/*': '/$1',
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

module.exports = server
