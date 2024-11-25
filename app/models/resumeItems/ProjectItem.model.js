module.exports = (sequelize, Sequelize) => {
    const ProjectItem = sequelize.define('ProjectItem', {
        item_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        project_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        section_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        order: {
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
    

    return ProjectItem;
};
