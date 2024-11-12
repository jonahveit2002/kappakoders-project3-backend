module.exports = (app) => {
  const template = require("../controllers/template.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/template/:id", [authenticate], template.getForId);

  app.use("/resume-t1/student", router);
};
