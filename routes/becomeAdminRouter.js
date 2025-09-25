const { Router } = require("express");
const becomeAdminRouter = Router();
const becomeAdminController = require("../controller/becomeAdminController");
const isAuth = require("../middleware/isAuthenticated");

becomeAdminRouter.get("/", isAuth, becomeAdminController.getBecomeAdmin);
becomeAdminRouter.post("/", isAuth, becomeAdminController.postBecomeAdmin);

module.exports = becomeAdminRouter;
