const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  empName: {
    type: String,
    required: true,
    max: [128, "Too long, max is 128 characters"]
  },
  designation: { type: String, required: true, lowercase: true },
  image: { type: String, required: true },
  salary: Number,
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Employees", employeeSchema);
