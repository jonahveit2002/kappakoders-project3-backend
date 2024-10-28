module.exports = (sequelize, Sequelize) => {
  const Skill = sequelize.define("skill", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    proficiency_level: {
      type: Sequelize.ENUM,
      values: ['beginner', 'intermediate', 'advanced'],
      allowNull: true,
    },
  });

  return Skill;
};
