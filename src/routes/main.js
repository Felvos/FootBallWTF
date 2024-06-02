const express = require('express');
const router = express.Router();
const session = require('express-session');
const { getAllMatches } = require('../services/dataBasePG'); 

router.get('/', async (req, res) => {
    try
    {  
        const data = await getAllMatches();
        res.render('calendar', {userId: req.session.userId, userRole: req.session.userRole, userLogin: req.session.userLogin, data: data});
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
