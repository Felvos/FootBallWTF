const express = require('express');
const router = express.Router();
const session = require('express-session');
const { getTournametTable } = require('../services/dataBasePG'); 

router.get('/', async (req, res) => {
    try
    {  
        const data = await getTournametTable();
        res.render('tournamenttable', {userId: req.session.userId, userLogin: req.session.userLogin, userRole: req.session.userRole, data: data});
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;