module.exports = (app) => {
    const link = require("../controllers/link.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.get("/link", [authenticate], link.getAllForUser);
  
    router.get("/link/:id", [authenticate], link.getForId);
  
    router.post("/link/", [authenticate], link.create);
  
    router.put("/link/:id", [authenticate], link.update);
  
    router.delete("/link/:id", [authenticate], link.delete);
  
    app.use("/resume-t1/student", router);
  };
  