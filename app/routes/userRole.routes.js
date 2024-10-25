module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Get all roles for user
  router.get("/user/:userId", [authenticate], userrole.findAllForUser);

  app.use("/resume-builder-t1/user", router);
};
