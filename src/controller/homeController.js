import { json } from 'body-parser';
import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const handleUserPage = async (req, res) => {
    // model => get data from database
    let listUser = await userService.getListUser();
    return res.json(listUser);
}

const handleUserDetail = async (req, res) => {
    let userID = req.params.id;
    let user = await userService.getUserByID(userID);
    return res.json(user);
}

const handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    return res.send(message)
}

const handleDeleteUser = (req, res) => {
    let userId = req.params.id;
    let message = userService.deleteUserByID(userId)
    return res.send(message)
}

const handleUpdateUser = async (req, res) => {
    let userID = req.body.id;
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let mess = await userService.updateUser(userID, email, firstName, lastName, address);
    res.send(mess)
}

module.exports = {
    handleHelloWorld, handleUserPage, handleUserDetail, handleCreateNewUser, handleDeleteUser, handleUpdateUser
}