const express = require('express');
const router = express.Router();
const session = require('express-session');
const { existUser, setNewPassword } = require('../services/dataBasePG'); 

router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка при выходе');
        }
        res.sendStatus(200);
    });
});

router.post('/change-password', async (req, res) => {
    try
    {
        
        const { userLogin, currentPassword, newPassword } = req.body;
        if(await existUser(userLogin, currentPassword))
        {
            await setNewPassword(userLogin, currentPassword, newPassword);
            res.status(200).send({message: "Вы успешно сменили пароль!"});
        }
        else 
        {

            res.status(401).send({message: 'Неправильный логин или пароль'});
        }
    }
    catch(err)
    {
        console.error(err);
        res.status(500).send({message: 'Ошибка сервера'});
    }

});

module.exports = router;
