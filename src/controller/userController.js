import userService from '../service/userService'


const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter"
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

const handleGetAllUser = async (req, res) => {
    let userID = req.params.id; //ALL, id
    if (!userID) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameters',
            users: []
        })
    }

    let users = await userService.getAllUser(userID);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        users
    })
}

const handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message)
}

const handleDeleteUser = async (req, res) => {
    let userId = req.body.id
    let message = await userService.deleteUserByID(userId)
    return res.status(200).json(message)
}

const handleUpdateUser = async (req, res) => {
    let message = await userService.updateUser(req.body)
    return res.status(200).json(message)
}

const getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data)
    } catch (error) {
        console.log('check log error: ', error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleDeleteUser,
    handleUpdateUser,
    getAllCode
}