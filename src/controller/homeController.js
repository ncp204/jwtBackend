import { json } from 'body-parser';
import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const handleUserPage = async (req, res) => {
    // model => get data from database
    let listUser = await userService.getListUser();
    return res.json(listUser)
}

const handleUserDetail = async (req, res) => {
    let userID = req.params.id;
    let user = await userService.getUserDetail(userID);
    return res.json(user);
}

const handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    return res.send(message)
}

const handleDeleteUser = (req, res) => {
    let userId = req.params.id;
    console.log(userId);
    userService.deleteUser(userId)
    return res.redirect("/user")
}

const handleUpdateUser = async (req, res) => {
    let userID = req.body.id;
    let email = req.body.email;
    let username = req.body.username;
    await userService.updateUser(userID, email, username);
    res.send('Update succeed')
}

module.exports = {
    handleHelloWorld, handleUserPage, handleUserDetail, handleCreateNewUser, handleDeleteUser, handleUpdateUser
}