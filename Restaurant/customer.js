const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  firstName: String,
  lastName: String,
  schoolId: {
    required: true,
    type: Number,
  },
  tableNo: Number,

});

reservationSchema.pre("save", function (next) {
  let currentDate = new Date();
  this.created = currentDate;
  next();
});

const Reservation = mongoose.model("Student", reservationSchema); //hangi scema ile dışarı çıkaracağını gösteriyor

module.exports = Reservation;
