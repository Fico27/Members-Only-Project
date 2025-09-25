const { Router } = require("express");
const becomeAdminRouter = Router();
const becomeAdminController = require("../controller/becomeAdminController");
const isAuth = require("../middleware/isAuthenticated");

becomeAdminRouter.get("/", isAuth, becomeAdminController.getBecomeAdmin);
becomeAdminRouter.post("/", becomeAdminController.postBecomeAdmin);

module.exports = becomeAdminRouter;
