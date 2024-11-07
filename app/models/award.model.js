module.exports = (sequelize, Sequelize) => {
    const Award = sequelize.define("award", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      institution: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_awarded: {
        type: Sequelize.DATEONLY
      }
    });
  
    return Award;
  };
  