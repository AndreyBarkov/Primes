const express = require('express');
const router = express.Router();
const PrimesHandler = require('./PrimesHandler');

router.post('/api/primesMedian', (req, res) =>{
    const limit = parseInt(req.body.limit, 10);
    if(!limit){
        res.status(400)
        res.send('Limit value is invalid');
        return;
    }
    const primesMedian = PrimesHandler.findPrimesMedian(limit);
    res.send(primesMedian);
})
router.get('/', (req, res)=>{
    res.send('TEST');
})
router.get('/api/primesTEST', (req, res)=>{
    const primesMedian = PrimesHandler.findPrimesMedian(10);
    res.send(primesMedian);
})
module.exports = router;