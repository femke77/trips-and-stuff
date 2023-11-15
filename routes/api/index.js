const router = require('express').Router();

router.use('/travellers', require("./travellerRoutes"));
router.use('/locations', require("./locationRoutes"));
router.use('/trips', require("./tripRoutes.js"));

module.exports = router;