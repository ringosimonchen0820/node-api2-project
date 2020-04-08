const express = require ('express');

const Data = require('./db');

const router = express.Router();

//* get <<<<< posts data
router.get('/', (req, res) => {
    Data.find()
    .then(data => {
        res.status(200).json({ success: true, data });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ success: false, Message: 'posts information can not be retrieved', err });
    })
});

//! mind the S in exportS
module.exports = router;