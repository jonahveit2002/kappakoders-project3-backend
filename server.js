require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize.sync({ alter: true });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/link.routes.js")(app);
require("./app/routes/education.routes.js")(app);
require("./app/routes/experience.routes.js")(app);
require("./app/routes/project.routes.js")(app);
require("./app/routes/skill.routes.js")(app);
require("./app/routes/resume.routes.js")(app);
require("./app/routes/template.routes.js")(app);

require("./app/routes/award.routes")(app);
require("./app/routes/review.routes.js")(app);
require("./app/routes/comment.routes.js")(app);
require("./app/routes/professionalsummaries.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3011;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
