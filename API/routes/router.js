const { assignSanta } = require('../controller/secretSanta');

const router = require('express').Router();

router.post("/assignSanta", assignSanta)

module.exports = router