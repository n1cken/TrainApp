const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Wihtout ID");
});

// TODO: Error handling
router.get('/:id', (req, res) => {
  res.send("ID");
});

module.exports = router;

