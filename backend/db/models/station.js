module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('station', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  Station.associate = (models) => {
    Station.hasMany(models.timetable)
  };

  return Station;
}
