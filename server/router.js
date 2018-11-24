const express = require('express');
const router = express.Router();
const PrimesHandler = require('./PrimesHandler');

router.post('/api/primesMedian', (req, res) => {
    const limit = parseInt(req.body.limit, 10);
    if (!limit) {
        res.sendStatus(400)
        return;
    }
    return PrimesHandler.findPrimesMedian(limit)
    .then(median => {
        res.send(median);
    })
    .catch((error)=>{
        res.status(500);
        res.send(error);
    })
})
router.get('/', (req, res) => {
    res.send('Test');
})

module.exports = router;