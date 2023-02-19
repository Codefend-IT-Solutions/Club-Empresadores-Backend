const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    speaker: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    socials: [
      {
        instagram: {
          type: String,
          required: true,
        },
        linkedIn: {
          type: String,
          required: true,
        },
        twitter: {
          type: String,
          required: true,
        },
        facebook: {
          type: String,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("agenda", agendaSchema);
