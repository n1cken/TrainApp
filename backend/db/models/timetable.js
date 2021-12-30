module.exports = (sequelize, DataTypes) => {
  const Timetable = sequelize.define('timetable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    departure: DataTypes.DATE,
    arrival: DataTypes.DATE
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  return Timetable;
}

