const router = require('express').Router();
const { User} = require('../../models');

// Get all users
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
    console.log(allUsers);
    res.json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post('/',async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const userLogin = await User.findOne({
      where: { email: req.body.email }
    });

    if (!userLogin) {
      res.status(400).json({ message: 'No user with that username!' });
      return;
    }

    const validPassword = await userLogin.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userLogin.id;
      req.session.email = userLogin.email;
      req.session.logged_in = true;

      res.json('You are now logged in!');
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// User logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;