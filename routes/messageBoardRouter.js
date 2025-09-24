const { Router } = require("express");
const messageBoardRouter = Router();
const messageBoardController = require("../controller/messageBoardController");

messageBoardRouter.get("/", messageBoardController.getMessageBoard);

module.exports = messageBoardRouter;
