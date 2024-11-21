module.exports = (sequelize, Sequelize) => {
    const LinkItem = sequelize.define('LinkItem', {
        item_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        link_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        section_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
    

    return LinkItem;
};
