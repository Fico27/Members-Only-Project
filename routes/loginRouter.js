const { Router } = require("express");
const loginRouter = Router();
const loginController = require("../controller/loginController");

loginRouter.get("/", loginController.getLogin);

module.exports = loginRouter;
