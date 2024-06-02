const express = require('express');
const router = express.Router();
const session = require('express-session');
const { getAllTeamsAdmin,
    getAllTrainersAdmin,
    getAllMatchesAdmin,
    getAllPlayersAdmin,
    deleteteams,
    deletematches,
    deleteplayers,
    deletetrainers
 } = require('../services/dataBasePG'); 

router.get('/', async (req, res) => {
    try
    {  
        res.render('admin', {userId: req.session.userId, userRole: req.session.userRole, userLogin: req.session.userLogin});
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
        const data = await getAllPlayersAdmin();
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
        const data = await getAllTeamsAdmin();
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
        const data = await getAllTrainersAdmin();
        res.status(200).json(data);
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

router.get('/getAllMatches', async (req, res) => {
    try
    {  
        const data = await getAllMatchesAdmin();
        res.status(200).json(data);
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});



//-----------------------Удаление по формам--------------------------------
router.post('/deleteteams', async (req, res) => {
    const {ids} = req.body;
    try
    {  
        await deleteteams(ids);
        res.status(200).send({message: "Успешно удалено!"});
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});
router.post('/deletetrainers', async (req, res) => {
    const {ids} = req.body;
    try
    {  
        await deletetrainers(ids);
        res.status(200).send({message: "Успешно удалено!"});
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});
router.post('/deleteplayers', async (req, res) => {
    const {ids} = req.body;
    try
    {  
        await deleteplayers(ids);
        res.status(200).send({message: "Успешно удалено!"});
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});
router.post('/deletematches', async (req, res) => {
    const {ids} = req.body;
    try
    {  
        await deletematches(ids);
        res.status(200).send({message: "Успешно удалено!"});
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;