const mongoose = require("mongoose");

const registerAgendaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "user",
    },
    agenda: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "agenda",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("registerAgenda", registerAgendaSchema);
