module.exports = (app) => {
  const userrole = require("../controllers/userrole.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Get all roles for user
  router.get("/userrole/:userId", [authenticate], userrole.findAllForUser);

  app.use("/resume-t1/user", router);
};
