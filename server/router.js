const express = require('express');
const router = express.Router();
const PrimesHandler = require('./PrimesHandler');
const MAX_LIMIT = 100000000;
router.post('/api/primesMedian', (req, res) => {
    const limit = parseInt(req.body.limit, 10);
    if (!limit || limit< 2 || limit >= MAX_LIMIT) {
        res.sendStatus(400)
        res.send('Limit is invalid')
        return;
    }
    PrimesHandler.findPrimesMedian(limit)
    .then(median => {
        res.send({median});
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