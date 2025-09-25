const { Router } = require("express");
const createMessageRouter = Router();
const createMessageController = require("../controller/createMessageController");
const isAuth = require("../middleware/isAuthenticated");

createMessageRouter.get("/", isAuth, createMessageController.getCreateMessage);
createMessageRouter.post(
  "/",
  isAuth,
  createMessageController.postCreateMessage
);

module.exports = createMessageRouter;
