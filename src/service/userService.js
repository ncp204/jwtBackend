import bcrypt from 'bcrypt';
import { connection } from "../config/connectDB"
import db from "../models/index"

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

const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            console.log(data);
            resolve('Created new user succeed');
        } catch (error) {
            reject(error);
        }
    }).catch((error) => {
        console.error('Error creating a new user:', error);
        return 'Created new user error';
    });
};

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

const deleteUserByID = async (userID) => {
    try {
        await db.User.destroy({
            where: {
                id: userID
            }
        })
        return 'Delete user succeed';
    } catch (error) {
        console.log('Error here: ', error);
    }
}

const updateUser = async (id, email, firstName, lastName, address) => {
    if (id && email && firstName && lastName && address) {
        let user = await getUserByID(id);
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
        }
    } else {
        return "Missing required params"
    }
}

module.exports = {
    hashPassword, createNewUser, getUserByID, getListUser, deleteUserByID, updateUser
}