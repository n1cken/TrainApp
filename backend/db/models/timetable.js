module.exports = (sequelize, DataTypes) => {
  const Timetable = sequelize.define('timetable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() {
        const rawValue = this.getDataValue('id');
        return rawValue;
      }
    },
    departure: {
      type: DataTypes.DATE,
      get() {
        const rawValue = this.getDataValue('departure');
        return rawValue;
      }
    },
    arrival: DataTypes.DATE
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  return Timetable;
}

