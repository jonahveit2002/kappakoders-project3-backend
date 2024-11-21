module.exports = (sequelize, Sequelize) => {
  const ResumeSection = sequelize.define("resumeSection", {
    section_id: {
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
        "award",
        "link",
        "professional_summary",
      ),
      allowNull: false,
    },
    section_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
    

  return ResumeSection;
};
