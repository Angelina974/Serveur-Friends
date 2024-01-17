/**
 * Find a friend in an array of friends
 * 
 * @param {string} friendName - Name of the friend to find
 * @param {object[]} friendArray - Array of friend objects, like [{name: "Joey", birthDate: "1980-05-01"}, ...]
 * @returns {*} The friend which was found in the array, or "undefined" if the friend was not found
 */
function findFriend(friendName, friendsArray) {
    console.log(">> Searching for friend... " + friendName)

    let friend = friendsArray.find(function findFriend(friend) {
        if (!friend) return false
        if (friend.name == friendName)
            return true
        else
            return false
    })

    return friend
}

/**
 * Removes a friend from an array of friends
 * 
 * @param {string} friendName - Name of the friend to remove
 * @param {object[]} friendArray - Array of friend objects, like [{name: "Joey", birthDate: "1980-05-01"}, ...]
 * @returns {object[]} The array of friends without the removed friend
 */
function removeFriendFromAppartment(friendName, friendsArray) {
    const newFriendsArray = friendsArray.filter(function filterFriends(friend) {
        if (!friend) return false
        if (friend.name == friendName)
            return false
        else
            return true
    })

    return newFriendsArray
}

function updateFriend (updatedFriend, friendsArray) {
    const newFriendsArray = friendsArray.map(function mapFriends(friend) {
        if (!friend) return false
        if (friend.id == updatedFriend.id)
            return updatedFriend
        else
            return friend
    })

    return newFriendsArray
}

// Export functions
module.exports = {
    findFriend,
    removeFriendFromAppartment,
    updateFriend

}