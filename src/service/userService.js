import bcrypt from 'bcrypt';
import { connection } from "../config/connectDB"
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password);
    // await connection.execute(`insert into user(email, password, username) values(?, ?, ?)`, [email, hashPass, username])

    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
    } catch (error) {
        console.log(error);
    }
}

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

    users = await db.User.findAll();
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