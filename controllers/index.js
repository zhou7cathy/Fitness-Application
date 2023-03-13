const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard_routes');
router.use('/api', apiRoutes);
router.use('/', dashboardRoutes);
module.exports = router;
