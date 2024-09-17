const jsonServer = require('json-server')

const path = require('path')

const fs = require('fs')
fs.copyFileSync(path.join('./tmp', 'db.json'), path.join('/tmp', 'db.json'))
const server = jsonServer.create()
const router = jsonServer.router(path.join('/tmp', 'db.json'))

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
