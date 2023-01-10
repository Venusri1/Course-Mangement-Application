const { Admin } = require("mongodb");
const mongoose = require("mongoose");
const adminsSchema = new mongoose.Schema({
  // _id:mongoose.Schema.Types.ObjectId,
  emailId: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    allowNull: false,
  },
   token: {
        type: String,
      }
    }

);

module.exports = mongoose.model("Admins", adminsSchema);


