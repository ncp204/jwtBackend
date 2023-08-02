import bcrypt from 'bcrypt';
import { connection } from "../config/connectDB"
import db from "../models/index"
import { response } from 'express';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

const getUserByID = async (userID) => {
    let user = {};
    try {
        user = await db.User.findOne({
            where: {
                id: userID
            }
        });
        user = user.get({ plain: true })
        return user;
    } catch (error) {
        console.log('Error here: ', error);
    }
}

const getListUser = async () => {
    let users = [];
    try {
        users = await db.User.findAll();
        return users;
    } catch (error) {
        console.log('Error here: ', error);
    }
}

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    raw: true,
                    where: { email: email },
                    attributes: ['email', 'password', 'roleId']
                })

                if (user) {
                    let checkPassword = bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password"
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User data not found"
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your email isn't exist!"
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used'
                })
            } else {
                let hashPass = await hashPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPass,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === 1 ? true : false,
                    roleId: data.roleId
                });
                resolve({
                    errCode: 0,
                    message: 'Ok'
                });
            }

        } catch (error) {
            reject(error);
        }
    })
};


const deleteUserByID = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userID) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let user = await db.User.findOne({ where: { id: userID } });
                if (!user) {
                    resolve({
                        errCode: 2,
                        message: "User is not exist"
                    })
                } else {
                    await db.User.destroy({
                        where: {
                            id: userID
                        }
                    })
                    resolve({
                        errCode: 0,
                        message: "Delete succeed"
                    })
                }
            }

        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

const updateUser = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let id = body.id;
            let email = body.email;
            let firstName = body.firstName;
            let lastName = body.lastName;
            let address = body.address;

            if (id && email && firstName && lastName && address) {
                let user = await getAllUser(id);
                if (user) {
                    await db.User.update(
                        {
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            address: address
                        },
                        {
                            where: {
                                id: id
                            }
                        })
                    resolve({
                        errCode: 0,
                        message: "Update succeed"
                    })
                }
            } else {
                resolve({
                    errCode: 0,
                    message: "Missing required params"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required param',
                    data: {}
                });
            } else {
                let res = {};
                let allCode = await db.AllCode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.errMessage = 'Succeed'
                res.data = allCode;
                resolve(res);
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    hashPassword, getUserByID, getListUser,
    handleUserLogin,
    getAllUser,
    createNewUser,
    deleteUserByID,
    updateUser,
    getAllCodeService
}