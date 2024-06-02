const express = require('express');
const router = express.Router();
const session = require('express-session');
const { existUser, userInfo, regUser, getAllMatches } = require('../services/dataBasePG');


router.get('/', async (req, res) => {
    if(req.session.userId && req.session.userRole)
    {
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
    }
    else
    {
        res.render('login');
    }
});




router.post('/login', async (req, res) => {
    try 
    {
        const { login, password } = req.body;
        if (await existUser(login, password)) 
        {
            const user = await userInfo(login, password);
            req.session.userId = user.id;
            req.session.userRole = user.role;
            req.session.userLogin = user.login;
            req.session.isLoggedIn = true;
            res.status(200).send({message: "Вы успешно авторизовались!"});
        } 
        else 
        {
    
            res.status(401).send({message: 'Неправильный логин или пароль'});
        }
    } 
    catch (err) 
    {
        console.error(err);
        res.status(500).send({message: 'Ошибка сервера'});
    }
});

router.post('/register', async (req, res) => {
    try 
    {
        const { login, password, repeated_password } = req.body;
        if (await regUser(login, password, repeated_password)) 
        {
            const user = await userInfo(login, password);
           
            req.session.userId = user.id;
            req.session.userRole = user.role;
            req.session.userLogin = user.login;
            req.session.isLoggedIn = true;
            res.status(200).send({message: "Вы успешно зарегистрировались!"});
        } 
        else 
        {
            res.status(401).send({message: "Введенные пароли не совпадают!"});
        }
    } 
    catch (err) 
    {
        console.error(err);
        res.status(500).send({message: 'Ошибка сервера'});
    }
});

module.exports = router;