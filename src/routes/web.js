import express from 'express';
import homeController from '../controller/homeController';
import userController from '../controller/userController';

const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */


const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.get("/user", homeController.handleUserPage)
    router.get("/user/:id", homeController.handleUserDetail)
    router.post('/user/create-user', homeController.handleCreateNewUser)
    router.delete('/delete-user/:id', homeController.handleDeleteUser)
    router.put('/update-user', homeController.handleUpdateUser)

    router.post('/api/login', userController.handleLogin)
    router.get('/api/user/:id', userController.handleGetAllUser)
    router.post('/api/user/create', userController.handleCreateNewUser)
    router.delete('/api/user/delete', userController.handleDeleteUser)
    router.put('/api/user/update', userController.handleUpdateUser)


    return app.use("/", router)
}

export default initWebRoutes;