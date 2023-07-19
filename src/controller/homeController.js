import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const handleUserPage = async (req, res) => {
    // model => get data from database
    let listUser = await userService.getListUser();
    return res.render("user.ejs", { listUser })
}

const handleCreateNewUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    await userService.createNewUser(email, password, username)
    return res.redirect("/user")
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
    handleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser, handleUpdateUser
}