import express from 'express';

/**
 * 
 * @param {*} app  - express app
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public'))
    // để express biết sẽ sử ụng html thông qua một view engine là ejs
    app.set("view engine", "ejs")
    // tất cả file views sẽ lưu trữ trong src/views
    app.set("views", "./src/views")
}

export default configViewEngine;