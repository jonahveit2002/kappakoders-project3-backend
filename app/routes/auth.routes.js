module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Login
  router.post("/login", auth.login);

  // Authorization
  router.post("/authorize/:id", auth.authorize);

  // Logout
  router.post("/logout", auth.logout);

  // Validate Token
  router.post("/validate", auth.validateToken);

  app.use("/resume-builder-t1", router);
};
