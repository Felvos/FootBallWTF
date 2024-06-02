const express = require('express');
const path = require('path');
const fs = require('fs');
const url = require('url');
const mysql = require('mysql2');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const authRouter = require('./src/routes/login');
const mainRouter = require('./src/routes/main');
const statisticRouter = require('./src/routes/statistic');
const feedbackRouter = require('./src/routes/feedback');
const tournamenttableRouter = require('./src/routes/tournamenttable');
const logoutRouter = require('./src/routes/logout');
const adminRouter = require('./src/routes/admin');



app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));





// Настройка маршрутов
app.use('/', authRouter);
app.use('/main', mainRouter);
app.use('/statistic', statisticRouter);
app.use('/feedback', feedbackRouter);
app.use('/tournamenttable', tournamenttableRouter);
app.post('/logout', logoutRouter);
app.post('/change-password', logoutRouter);
app.use('/admin', adminRouter);



// Страница 404
app.use((req, res) => {
    res.status(404).render('notfound', {userId: req.session.userId, userRole: req.session.userRole, userLogin: req.session.userLogin});
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});