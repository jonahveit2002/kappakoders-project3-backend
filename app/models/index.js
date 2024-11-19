const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.userRole = require("./userrole.model.js")(sequelize, Sequelize);
db.education = require("./education.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.skill = require("./skill.model.js")(sequelize, Sequelize);
db.resume = require("./resume.model.js")(sequelize, Sequelize);
db.template = require("./template.model.js")(sequelize, Sequelize);
db.resumesection = require("./resumesection.model.js")(sequelize, Sequelize);
db.award = require("./award.model.js")(sequelize, Sequelize);
db.link = require("./link.model.js")(sequelize, Sequelize);
db.professionalSummary = require("./professionalsummary.model.js")(
  sequelize,
  Sequelize
);
db.skillItem = require("./resumeItems/SkillItem.model.js")(sequelize, Sequelize);
// db.educationItem = require("./resumeItems/EducationItem.model.js")(sequelize, Sequelize);
// db.experienceItem = require("./resumeItems/ExperienceItem.model.js")(sequelize, Sequelize);
// db.projectItem = require("./resumeItems/ProjectItem.model.js")(sequelize, Sequelize);
// db.awardItem = require("./resumeItems/AwardItem.model.js")(sequelize, Sequelize);
// db.linkItem = require("./resumeItems/LinkItem.model.js")(sequelize, Sequelize);


// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

/* foreign keys for relationship between role and user */

db.user.hasMany(
  db.userRole,
  { as: "userRole" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.userRole.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.role.hasMany(
  db.userRole,
  { as: "userRole" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.userRole.belongsTo(
  db.role,
  { as: "role" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Relationship mapping for user - education relationship
db.user.hasMany(
  db.education,
  { as: "education" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.education.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Relationship mapping for user - experience relationship
db.user.hasMany(
  db.experience,
  { as: "experience" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.experience.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Relationship mapping for user - project relationship
db.user.hasMany(
  db.project,
  { as: "project" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.project.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Relationship mapping for user - link relationship
db.user.hasMany(
  db.link,
  { as: "link" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.link.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Relationship mapping for user - skill relationship
db.user.hasMany(
  db.skill,
  { as: "skill" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.skill.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Relationship mapping for user - resume relationship
db.user.hasMany(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// Relationship mapping for user - award relationship
db.user.hasMany(
  db.award,
  { as: "award" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.award.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

/* foreign keys for relationship between role and user */

db.resume.hasMany(
  db.resumesection,
  { as: "resumeSection" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resumesection.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.template.hasMany(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.belongsTo(
  db.template,
  { as: "template" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.hasMany(
  db.professionalSummary,
  { as: "professionalSummary" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.professionalSummary.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.user.hasMany(
  db.professionalSummary,
  { as: "professionalSummary" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.professionalSummary.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// resume Items relationships
// skillItem belongs to skill
db.skillItem.belongsTo(db.skill, {
  as: "skill",
  foreignKey: { name: "skill_id", allowNull: false },
  onDelete: "CASCADE",
});

// ResumeSection has many skillItems
db.resumesection.hasMany(db.skillItem, {
  as: "skillItems",      // Plural to match the hasMany relationship
  foreignKey: "section_id",  
  onDelete: "CASCADE",    
});

// skillItem belongs to ResumeSection
db.skillItem.belongsTo(db.resumesection, {
  as: "resumeSection",     
  foreignKey: { name: "section_id", allowNull: false },  
  onDelete: "CASCADE",       
});



// db.educationItem.belongsTo(db.resumesection, {
//   as: "resumeSection",
//   foreignKey: { name: "section_id", allowNull: false },
//   onDelete: "CASCADE",
// });

// db.experienceItem.belongsTo(db.resumesection, {
//   as: "resumeSection",
//   foreignKey: { name: "section_id", allowNull: false },
//   onDelete: "CASCADE",
// });

// db.linkItem.belongsTo(db.resumesection, {
//   as: "resumeSection",
//   foreignKey: { name: "section_id", allowNull: false },
//   onDelete: "CASCADE",
// });

// db.projectItem.belongsTo(db.resumesection, {
//   as: "resumeSection",
//   foreignKey: { name: "section_id", allowNull: false },
//   onDelete: "CASCADE",
// });

// db.skillItem.belongsTo(db.resumesection, {
//   as: "resumeSection",
//   foreignKey: { name: "section_id", allowNull: false },
//   onDelete: "CASCADE",
// });


module.exports = db;
