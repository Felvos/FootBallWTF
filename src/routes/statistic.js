const express = require('express');
const router = express.Router();
const session = require('express-session');
const { getAllTrainers, getAllPlayersOfTeam, getAllPlayers, getAllTeams } = require('../services/dataBasePG'); 

router.get('/', async (req, res) => {
    try
    {  
        res.render('statistic', {userId: req.session.userId, userRole: req.session.userRole, userLogin: req.session.userLogin});
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});
router.get('/getAllPlayers', async (req, res) => {
    try
    {  
        const data = await getAllPlayers();
        res.status(200).json(data);
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});
router.get('/getAllPlayersOfTeam', async (req, res) => {
    try
    {  
        const team = req.query.team;
        const data = await getAllPlayersOfTeam(team);
        res.status(200).json(data);
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});
router.get('/getAllTrainers', async (req, res) => {
    try
    {  
        const data = await getAllTrainers();
        res.status(200).json(data);
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});
router.get('/getAllTeams', async (req, res) => {
    try
    {  
        const data = await getAllTeams();
        res.status(200).json(data);
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});
module.exports = router;