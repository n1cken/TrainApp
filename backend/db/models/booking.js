module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('booking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.TEXT,
    timetableArrivalId: DataTypes.INTEGER,
    timetableDepartureId: DataTypes.INTEGER
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  Booking.associate = (models) => {
    Booking.hasMany(models.ticket)
    Booking.belongsTo(models.timetable, {foreignKey: 'timetableArrivalId', targetKey: 'id'});
    Booking.belongsTo(models.timetable, {foreignKey: 'timetableDepartureId', targetKey: 'id'});
  };

  return Booking;
}
