module.exports = (app) => {
  const education = require("../controllers/education.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/user/education", [authenticate], education.getAllForUser);

  router.get("/user/education/:id", [authenticate], education.getForId);

  router.post("/user/education/", [authenticate], education.create);

  router.put("/user/education/:id", [authenticate], education.update);

  router.delete("/user/education/:id", [authenticate], education.delete);

  app.use("/resume-t1", router);
};
