module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('seat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  return Seat;
}
