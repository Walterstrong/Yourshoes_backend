const mongoose = require("mongoose");

const memberSchema = new mongoose.MemberSchema({
  mb_nick: {
    type: String,
    required: true,
    index: { unique: true, sparse: true },
  },
  mb_phone: {
    type: String,
    required: true,
  },
  mb_password: {
    type: String,
    required: true,
    select: false,
  },
  mb_type: {
    type: String,
    required: false,
    default: "USER",
    enum: {
      values: meber_type_enums,
      message: "{VALUE} is not among permitted values",
    },
  },
  mb_status: {
    type: String,
    required: false,
    default: "ACTIV",
    enum: {
      values: meber_status_enums,
      message: "{VALUE} is not among permitted values",
    },
  },
  mb_full_name: {
    type: String,
    required: false,
  },
  mb_address: {
    type: String,
    required: false,
  },
  mb_image: {
    type: String,
    required: false,
  },
  mb_point: {
    type: Number,
    required: false,
    default: 0,
  },
});
module.exports = mongoose.model("Member", memberSchema);
