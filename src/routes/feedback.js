const express = require('express');
const router = express.Router();
const session = require('express-session');
const { sendFeedback } = require('../services/dataBasePG');



router.get('/', (req, res) => {
    res.render('feedback', {userId: req.session.userId, userLogin: req.session.userLogin, userRole: req.session.userRole});
});

router.post('/sendfeedback', async (req, res) => {
    const { fio, mail, message } = req.body;

    if (!fio || !mail || !message) 
    {
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }
    else
    {
        try
        {
            if (await sendFeedback(fio, mail, message))
            {
                res.status(200).json({ message: 'Заявка принята. Спасибо за ваш отзыв!' });
            }
        }
        catch (err) 
        {
            console.error(err);
            res.status(500).send({message: 'Ошибка сервера'});
        }
        
    }
});

module.exports = router;
