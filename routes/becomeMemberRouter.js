const { Router } = require("express");
const becomeMemberRouter = Router();
const becomeMemberController = require("../controller/becomeMemberController");

becomeMemberRouter.get("/", becomeMemberController.getBecomeMember);

module.exports = becomeMemberRouter;
