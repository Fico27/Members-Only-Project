const { Router } = require("express");
const createMessageRouter = Router();
const createMessageController = require("../controller/createMessageController");
const isAuth = require("../middleware/isAuthenticated");

createMessageRouter.get("/", isAuth, createMessageController.getCreateMessage);

module.exports = createMessageRouter;
