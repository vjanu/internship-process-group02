const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const iManagerRouter = require('./routes/internshipManager');
const formsRouter = require('./routes/forms');
const studentRouter = require('./routes/student');
const supervisorRouter = require('./routes/supervisor');
const loginRouter = require('./routes/login');
const form3Router = require('./routes/form3');
const form5Router = require('./routes/form5');
const form3DiaryRouter = require('./routes/form3');
const registerRouter = require('./routes/register');
const scheduleRouter = require('./routes/schedule');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/internship-manager', iManagerRouter);
app.use('/forms', formsRouter);
app.use('/student', studentRouter);
app.use('/supervisor', supervisorRouter);
app.use('/login', loginRouter);
app.use('/form3', form3Router);
app.use('/daily', form3DiaryRouter);
app.use('/register', registerRouter);
app.use('/schedule', scheduleRouter);
app.use('/form5', form5Router);

module.exports = app;