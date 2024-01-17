// Create an Express application with NodeJS
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const serveStatic = require('serve-static')

app.use("/img", serveStatic(__dirname + "/img"))

// Includes controllers for Express routes
const controllers = require("./controllers")

// Routes
app.get('/friends', controllers.getFriends)
app.get('/allFriends', controllers.getAllFriends)
app.get('/switchAppartment/:friendName', controllers.switchAppartment)

// Routes pour l'API CRUD
app.post('/friends', controllers.addFriend)
app.get('/friends/:name', controllers.getFriend)
app.put('/friends/:name', controllers.updateFriend)
app.delete('/friends/:name', controllers.deleteFriend)
app.get('/reset', controllers.reset)


// Start NodeJS server on port 3000
app.listen(3000, () => {
    console.log(`Server started on PORT 3000`)
})