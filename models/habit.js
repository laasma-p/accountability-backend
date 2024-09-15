const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Habit = sequelize.define("habit", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  isTracking: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Habit.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Habit, { foreignKey: "userId" });

module.exports = Habit;
