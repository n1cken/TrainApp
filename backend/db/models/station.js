module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('station', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stationName: DataTypes.STRING
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  return Station;
}
