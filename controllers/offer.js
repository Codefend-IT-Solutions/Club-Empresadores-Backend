//Models
const offerModel = require("../models/Offer");

//Helpers
const {
  Types: { ObjectId },
} = require("mongoose");

/**
 * @description Create Offer
 * @route POST /api/offer/create-offer
 * @access Private
 */
module.exports.createOffer = async (req, res) => {
  const { _id } = req.user;
  const { title, location, speaker, price, description, image } = req.body;

  //Edge cases and errors
  if (title === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Title is required", status: false }] });
  }
  if (location === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Location is required", status: false }] });
  }
  if (speaker === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Speaker is required", status: false }] });
  }
  if (price <= 0) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Price is required", status: false }] });
  }
  if (description === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Description is required", status: false }] });
  }
  if (image === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Image is required", status: false }] });
  }

  //Logic
  try {
    const offer = await offerModel.create({
      user: _id,
      title,
      location,
      description,
      speaker,
      price,
      image,
    });

    //Response
    return res.status(200).json({
      msg: "Offer Created",
      offer,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Get all offers
 * @route GET /api/offer/get-all-offers
 * @access Public
 */
module.exports.getAllOffers = async (req, res) => {
  try {
    const offers = await offerModel.find({});
    if (offers.length === 0) {
      return res.status(400).json({
        errors: [{ msg: "Offers not found", status: false }],
      });
    }

    //Response
    return res.status(200).json({ offers, status: true });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Get Specific Offer
 * @route GET /api/offer/get-specific-offers
 * @access Public
 */
module.exports.getSpecificOffer = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await offerModel.findOne({ _id: { $eq: ObjectId(id) } });

    if (!offer) {
      return res.status(400).json({
        errors: [{ msg: "Offer not found", status: false }],
      });
    }

    //Response
    return res.status(200).json({ offer, status: true });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Get User Offer
 * @route GET /api/user/get-user-offer
 * @access Private
 */
module.exports.getUserOffers = async (req, res) => {
  const { _id } = req.user;

  try {
    const offers = await offerModel.find({ user: { $eq: _id } });

    if (offers.length === 0) {
      return res.status(400).json({
        errors: [{ msg: "Offers not found", status: false }],
      });
    }

    //Response
    return res.status(200).json({ offers, status: true });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Delete Offer
 * @route DELETE /api/offer/delete
 * @access Public
 */
module.exports.deleteOffer = async (req, res) => {
  const { id } = req.params;

  try {
    await offerModel.deleteOne({ _id: ObjectId(id) });
    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Edit Offer
 * @route PUT /api/offer/edit
 * @access Public
 */
module.exports.editOffer = async (req, res) => {
  const { id } = req.params;
  const { title, location, speaker, price, description, image } = req.body;

  //Logic
  try {
    //Upadating agenda
    await offerModel.updateOne(
      { _id: ObjectId(id) },
      { title, location, speaker, price, description, image },
      { new: true }
    );

    //Response
    return res.status(200).json({
      msg: "Offer Updated",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
