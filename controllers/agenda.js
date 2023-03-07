//Models
const agendaModel = require("../models/Agenda");
const registerAgendaModel = require("../models/RegisterAgenda");

//Helpers
const {
  Types: { ObjectId },
} = require("mongoose");

/**
 * @description Add Agenda
 * @route POST /api/agenda/add-agenda
 * @access Public
 */
module.exports.addAgenda = async (req, res) => {
  const {
    name,
    speaker,
    date,
    hour,
    instagram,
    linkedIn,
    twitter,
    facebook,
    description,
    image,
  } = req.body;

  //Edge cases and errors
  if (name === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Name is required", status: false }] });
  }
  if (speaker === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Speaker is required", status: false }] });
  }
  if (date === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Date is required", status: false }] });
  }
  if (hour === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Hour is required", status: false }] });
  }
  if (image === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Image is required", status: false }] });
  }
  if (description === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Description is required", status: false }] });
  }

  //Preparing Input
  const input = {
    name,
    speaker,
    date,
    hour,
    image,
    socials: [
      {
        instagram,
        linkedIn,
        twitter,
        facebook,
      },
    ],
    description,
  };
  //Logic
  try {
    //Creating agenda
    const agenda = await agendaModel.create({ ...input });

    //Response
    return res.status(200).json({
      msg: "Agenda Created",
      agenda,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Get Agendas
 * @route GET /api/agenda/get-agendas
 * @access Public
 */
module.exports.getAgendas = async (req, res) => {
  try {
    const agendas = await agendaModel.find({});
    if (agendas.length === 0) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Agenda not found", status: false }] });
    }
    //Response
    return res.status(200).json({
      agendas,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Get Agenda
 * @route GET /api/agenda/get-agenda
 * @access Public
 */
module.exports.getAgenda = async (req, res) => {
  const { id } = req.params;
  try {
    const agenda = await agendaModel.findOne({ _id: ObjectId(id) });
    if (!agenda) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Agenda not found", status: false }] });
    }
    //Response
    return res.status(200).json({
      agenda,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Register Agenda
 * @route POST /api/agenda/register-agenda
 * @access Private
 */
module.exports.registerAgenda = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.body;

  try {
    const isAgendaExist = await registerAgendaModel.findOne({
      user: _id,
      agenda: ObjectId(id),
    });
    if (isAgendaExist) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Agenda already Exist!", status: false }] });
    }
    await registerAgendaModel.create({
      user: _id,
      agenda: ObjectId(id),
    });

    //Response
    return res.status(200).json({
      msg: "Agenda registered",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Get Registered Agendas
 * @route GET /api/agenda/get-registered-agendas
 * @access Public
 */
module.exports.getRegisteredAgendas = async (req, res) => {
  try {
    const registeredAgendas = await registerAgendaModel
      .find({})
      .populate("user agenda");
    if (registeredAgendas.length === 0) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Agenda not found", status: false }] });
    }
    //Response
    return res.status(200).json({
      registeredAgendas,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Get Registered Agenda
 * @route GET /api/agenda/get-registered-agenda
 * @access Public
 */
module.exports.getRegisteredAgenda = async (req, res) => {
  const { id } = req.params;
  try {
    const registeredAgenda = await registerAgendaModel
      .findOne({
        _id: ObjectId(id),
      })
      .populate("user agenda");
    if (!registeredAgenda) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Agenda not found", status: false }] });
    }
    //Response
    return res.status(200).json({
      registeredAgenda,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Delete Agenda
 * @route DELETE /api/agenda/delete-agenda
 * @access Public
 */
module.exports.deleteAgenda = async (req, res) => {
  const { id } = req.params;

  try {
    await agendaModel.deleteOne({ _id: ObjectId(id) });
    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Edit Agenda
 * @route PUT /api/agenda/edit
 * @access Public
 */
module.exports.editAgenda = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    speaker,
    date,
    hour,
    image,
    description,
    instagram,
    linkedIn,
    twitter,
    facebook,
  } = req.body;

  //Preparing Input
  const input = {
    name,
    speaker,
    date,
    hour,
    image,
    socials: [
      {
        instagram,
        linkedIn,
        twitter,
        facebook,
      },
    ],
    description,
  };

  //Logic
  try {
    //Upadating agenda
    await agendaModel.updateOne(
      { _id: ObjectId(id) },
      { ...input },
      { new: true }
    );

    //Response
    return res.status(200).json({
      msg: "Agenda Updated",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
