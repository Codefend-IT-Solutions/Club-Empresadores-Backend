//Models
const feedbackModel = require("../models/Feedback");

/**
 * @description Add Feedback
 * @route POST /api/feedback/add-feedback
 * @access Private
 */
module.exports.addFeedback = async (req, res) => {
  const { _id } = req.user;
  const { feedback } = req.body;

  //Edge cases and errors
  if (feedback === "") {
    return res
      .status(400)
      .json({ errors: [{ msg: "Feedback is required", status: false }] });
  }

  //Logic
  try {
    const feed = await feedbackModel.create({
      user: _id,
      feedback,
    });

    //Response
    return res.status(200).json({
      msg: "Thank You for your Feedback",
      feed,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

/**
 * @description Get Feedbacks
 * @route GET /api/feedback/get-feedbacks
 * @access Public
 */
module.exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find({}).populate("user");
    if (feedbacks.length === 0) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Feedback not found", status: false }] });
    }
    //Response
    return res.status(200).json({
      feedbacks,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
