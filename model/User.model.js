var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: false,
  },
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Task",
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  aadhar: {
    type: String, //will store url from sw3 bucket to store images and at the end will be a string (multer)
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  pan: {
    type: String,
    required: false,
  },
  projects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Project",
    required: false,
  }
});


module.exports = mongoose.model("User", UserSchema);