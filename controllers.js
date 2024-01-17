// Initialize localStorage for NodeJS
const db = require('node-localstorage')
let localStorage = new db.LocalStorage('./db')

// Includes all the tool functions we need (findFriend and removeFriendFromAppartment) from the module "tools"
const tools = require("./tools")

/**
 * Get friends
 */
function getFriends(req, res) {
    const friends19 = JSON.parse(localStorage.getItem('friends19'))
    const friends20 = JSON.parse(localStorage.getItem('friends20'))

    res.send({
        friends19,
        friends20
    })
}

/**
 * Get allFriends
 */
function getAllFriends(req, res) {
    const friends19 = JSON.parse(localStorage.getItem('friends19'))
    const friends20 = JSON.parse(localStorage.getItem('friends20'))

    res.send(friends19.concat(friends20))

}

/**
 * Switch appartment
 */
function switchAppartment(req, res) {
    const friendName = req.params.friendName;
    let friends19 = JSON.parse(localStorage.getItem('friends19'))
    let friends20 = JSON.parse(localStorage.getItem('friends20'))

    // Try to find the Friend in appartment 19
    let friend = tools.findFriend(friendName, friends19)

    if (friend != undefined) {
        friends19 = tools.removeFriendFromAppartment(friendName, friends19)
        friends20.push(friend);

        localStorage.setItem("friends19", JSON.stringify(friends19))
        localStorage.setItem("friends20", JSON.stringify(friends20))

    } else {
                
        // Try to find the Friend in appartment 20
        let myFriend = tools.findFriend(friendName, friends20)
        
        if (myFriend) {
            friends20 = tools.removeFriendFromAppartment(friendName, friends20)
            friends19.push(myFriend)

            localStorage.setItem("friends19", JSON.stringify(friends19))
            localStorage.setItem("friends20", JSON.stringify(friends20))
        }
    }

    res.json({
        friends19,
        friends20
    });
}

// Get friend
function getFriend(req, res) {
    const friendName = req.params.name;
    const friends19 = JSON.parse(localStorage.getItem('friends19'))
    const friends20 = JSON.parse(localStorage.getItem('friends20'))

    let friend = tools.findFriend(friendName, friends19)
    if (friend == undefined) {
        friend = tools.findFriend(friendName, friends20)
    }

    res.json(friend)
}

function addFriend(req, res) {
    const friend = req.body;
    const friends19 = JSON.parse(localStorage.getItem('friends19'))
    friends19.push(friend)
    localStorage.setItem("friends19", JSON.stringify(friends19))
    res.json(friend)
}

function updateFriend(req, res) {
    const friendName = req.params.name;
    const updatedFriend = req.body;
    const friends19 = JSON.parse(localStorage.getItem('friends19'))
    const friends20 = JSON.parse(localStorage.getItem('friends20'))
    
    let friend = tools.findFriend(friendName, friends19)
    if (friend == undefined) {
        const updatedFriends = tools.updateFriend(updatedFriend, friends20)
        localStorage.setItem("friends20", JSON.stringify(updatedFriends))
    }
    else {
        const updatedFriends = tools.updateFriend(updatedFriend, friends19)
        localStorage.setItem("friends19", JSON.stringify(updatedFriends))
    }

    res.json(friend)
}

function deleteFriend(req, res) {
    const friendName = req.params.name;
    let friends19 = JSON.parse(localStorage.getItem('friends19'))
    let friends20 = JSON.parse(localStorage.getItem('friends20'))

    let friend = tools.findFriend(friendName, friends19)
    if (friend == undefined) {
        friends20 = tools.removeFriendFromAppartment(friendName, friends20)
        localStorage.setItem("friends20", JSON.stringify(friends20))
    }
    else {
        friends19 = tools.removeFriendFromAppartment(friendName, friends19)
        localStorage.setItem("friends19", JSON.stringify(friends19))
    }

    res.json(friend)
}

function reset (req,res){
    const friends19 = JSON.parse(localStorage.getItem('friends'))
    localStorage.setItem("friends19", JSON.stringify(friends19))
    localStorage.setItem("friends20", JSON.stringify([]))
    
    res.json(friends19)
}

module.exports = {
    getFriends,
    getAllFriends,
    switchAppartment,
    getFriend,
    addFriend,
    updateFriend,
    deleteFriend,
    reset
}