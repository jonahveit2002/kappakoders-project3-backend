module.exports = (sequelize, Sequelize) => {
    const Link = sequelize.define("link", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(255),
            allownull: false,
        },
        url: {
            type: Sequelize.STRING(255),
            allownull: false,
        },
        userid: {
            type: Sequelize.INTEGER,
            allownull: false

        }
    });

    return Link;
};