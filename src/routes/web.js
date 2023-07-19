import express from 'express';
import homeController from '../controller/homeController'

const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */


const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.get("/user", homeController.handleUserPage)
    router.post('/user/create-user', homeController.handleCreateNewUser)
    router.delete('/delete-user/:id', homeController.handleDeleteUser)
    router.put('/update-user', homeController.handleUpdateUser)


    return app.use("/", router)
}

export default initWebRoutes;