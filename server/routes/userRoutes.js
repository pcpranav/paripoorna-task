const express = require("express");

const {
  addUser,
  getUsers,
  deleteUser,
  updateUser,
  getSingleUser,
} = require("../contollers/userController");

const router = express.Router();

router.route("/").get(getUsers).post(addUser);

router.route("/:id").delete(deleteUser).get(getSingleUser).put(updateUser);

module.exports = router;
