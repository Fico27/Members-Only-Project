const { Router } = require("express");
const becomeMemberRouter = Router();
const becomeMemberController = require("../controller/becomeMemberController");
const isAuth = require("../middleware/isAuthenticated");

becomeMemberRouter.get("/", isAuth, becomeMemberController.getBecomeMember);

module.exports = becomeMemberRouter;
