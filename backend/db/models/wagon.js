module.exports = (sequelize, DataTypes) => {
  const Wagon = sequelize.define('wagon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  Wagon.associate = (models) => {
    Wagon.hasMany(models.seat)
  };

  return Wagon;
}
