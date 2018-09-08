const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const formsRouter = require('./routes/forms');
const studentRouter = require('./routes/student');
const supervisorRouter = require('./routes/supervisor');
const form3Router = require('./routes/form3');
const form3DiaryRouter = require('./routes/form3');
const registerRouter = require('./routes/register');

const viewForm3Router=require('./routes/viewForm3');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/forms', formsRouter);
app.use('/student', studentRouter);
app.use('/supervisor', supervisorRouter);
app.use('/form3', form3Router);
app.use('/daily', form3DiaryRouter);
app.use('/register', registerRouter);

app.use('/viewForm3',viewForm3Router);



app.listen(3000,function(err){
if(err){
    console.error(err);
}else{
    console.log('Listening to port 3000');
}
});




module.exports = app;