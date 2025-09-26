const { Router } = require("express");
const messageBoardRouter = Router();
const messageBoardController = require("../controller/messageBoardController");
const isAuth = require("../middleware/isAuthenticated");

messageBoardRouter.get("/", isAuth, messageBoardController.getMessageBoard);
messageBoardRouter.post(
  "/delete/:message_id",
  isAuth,
  messageBoardController.postDeleteMessage
);

module.exports = messageBoardRouter;
