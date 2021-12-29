module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define('train', {
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

  Train.associate = (models) => {
    Train.hasMany(models.route)
    Train.hasMany(models.wagon)
  };

  return Train;
}
