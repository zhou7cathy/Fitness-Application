const express = require('express');
const withAuth = require('../../utils/auth');
const { User } = require('../../models');
const router = express.Router();

// POST route for submitting the question forms
router.post('/question', withAuth, async (req, res) => {

  const userData = await User.findByPk(req.session.user_id);

  await userData.update(req.body);

  await userData.save();

  // Handle form submission and redirect to account page
  res.status(200).json("OK");
});

module.exports = router;