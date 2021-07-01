const userDetails = require("../models/Details");

exports.getUsers = async (req, res, next) => {
  try {
    const user = await userDetails.find();

    return res.status(200).json({
      success: true,
      count: user.length,
      userData: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const { name, email, mobile, dob, job, url } = req.body;
    if (!name || !email || !mobile || !dob || !job || !url)
      return res.status(400).json({
        success: false,
        error: "Please enter all fields",
      });

    const user = await userDetails.create(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await userDetails.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found",
      });
    }

    await user.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await userDetails.findById(req.params.id);

    return res.status(200).json({
      success: true,
      singleUser: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, mobile, dob, job } = req.body;
    if (!name || !email || !mobile || !dob || !job)
      return res.status(400).json({
        success: false,
        error: "Please enter all fields",
      });

    await userDetails.findOneAndUpdate({ _id: req.params.id }, req.body);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
