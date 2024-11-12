module.exports = (sequelize, Sequelize) => {
  const ResumeSection = sequelize.define("resumeSection", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    section_type: {
      type: Sequelize.ENUM(
        "education",
        "experience",
        "project",
        "skill",
        "award"
      ),
      allowNull: false,
    },
    section_id: {
      type: Sequelize.INTEGER,
      required: true,
    },
    section_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return ResumeSection;
};
