
const DataTypes = require('sequelize/lib/data-types');
const typesOfUsers = require('../helpers/typesOfUsers');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
            // defaultValue: () => uuidv4(),
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        schoolId: {
            type: Sequelize.STRING,
        },
        role: {
            type: DataTypes.ENUM(
                "student",
                "teacher",
                "schoolAdmin",
                "superAdmin",
            ),
            allowNull: false,
            validate: {
                isIn: {
                    args: [typesOfUsers],
                    msg: "Not valid role"
                }
            }
        },
        age: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING
        },
        contactNo: {
            type: DataTypes.BIGINT
        },
        parentName: {
            type: DataTypes.STRING
        },
        className: {
            type: DataTypes.INTEGER
        }

    });

    return User;
};