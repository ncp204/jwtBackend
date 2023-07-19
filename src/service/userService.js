import bcrypt from 'bcrypt';
import { connection } from "../config/connectDB"

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password);
    await connection.execute(`insert into user(email, password, username) values(?, ?, ?)`, [email, hashPass, username])

}

const getListUser = async () => {
    let users = [];
    try {
        const [result, fields] = await connection.execute('Select * from user');
        return result ? result : users;
    } catch (error) {
        console.log('Check error: ', error);
    }
}

const deleteUser = async (userID) => {
    try {
        await connection.execute('Delete from user where id = ?', [userID])
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (id, email, username) => {
    try {
        await connection.execute('Update user set email=?, username=? where id=?', [email, username, id]);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    hashPassword, createNewUser, getListUser, deleteUser, updateUser
}