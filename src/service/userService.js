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

const getUserDetail = async (userID) => {
    let user = {};
    user = await db.User.findOne({
        where: {
            id: userID
        }
    });
    user = user.get({ plain: true })
    return user;
}

const getListUser = async () => {
    let users = [];
    // try {
    //     const [result, fields] = await connection.execute('Select * from user');
    //     return result ? result : users;
    // } catch (error) {
    //     console.log('Check error: ', error);
    // }

    try {
        users = await db.Users.findAll();
    } catch (error) {
        console.log(error);
    }
    return users;
}

const deleteUser = async (userID) => {
    // try {
    //     await connection.execute('Delete from user where id = ?', [userID])
    // } catch (error) {
    //     console.log(error);
    // }

    await db.User.destroy({
        where: {
            id: userID
        }
    })
}

const updateUser = async (id, email, username) => {
    // try {
    //     await connection.execute('Update user set email=?, username=? where id=?', [email, username, id]);
    // } catch (error) {
    //     console.log(error);
    // }

    await db.User.update(
        {
            email: email,
            username: username
        },
        {
            where: {
                id: id
            }
        })
}

module.exports = {
    hashPassword, createNewUser, getUserDetail, getListUser, deleteUser, updateUser
}