const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    // мб не передал! Переделать нахуй
    res.render('profile', { userId: req.session.userId, userRole: req.session.userRole, userLogin: req.session.userLogin});
});

module.exports = router;