const jsonServer = require('json-server')

const server = jsonServer.create()

const router = jsonServer.router('db.json')

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

function createFormData(formId, name, description, createdAt, updatedAt, version, users = [], id) {
    return {
        form_id: formId,
        name: name,
        description: description,
        createdAt: createdAt,
        updatedAt: updatedAt,
        version: version,
        users: users,
        id: id,
    };
}

fetch("http://localhost:3000/form", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(createFormData),
})
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

module.exports = server
