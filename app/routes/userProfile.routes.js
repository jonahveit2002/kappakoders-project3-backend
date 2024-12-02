module.exports = (app) => {
  const userProfileController = require("../controllers/userProfile.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Get a user's profile
  router.get("/:userId", [authenticate], userProfileController.getUserProfile);

  // Create a user's profile
  router.post("/", [authenticate], userProfileController.createUserProfile);

  // Update a user's profile
  router.put("/:userId", [authenticate], userProfileController.updateUserProfile);

  // Delete a user's profile
  router.delete("/:userId", [authenticate], userProfileController.deleteUserProfile);

  app.use("/resume-t1/userProfile", router);
};