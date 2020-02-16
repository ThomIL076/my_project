const createError = require('http-errors');
const express = require('express');
const hbs = require("hbs");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// create connection to database
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projet_final'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var candidatesRouter = require('./routes/candidates');
var companiesRouter = require('./routes/companies');
var departmentsRouter = require('./routes/departments');
var jobsRouter = require('./routes/jobs');

// view engine setup
// app.set('views', path.join(__dirname, './templates/views'));
// app.set('view engine', 'hbs');
// const viewsPath = path.join(__dirname, "./templates/views");
// app.set("views", viewsPath);

const publicDirectoryPath = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "./templates/views");
const registerPartials = path.join(__dirname, "./templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(registerPartials);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(publicDirectoryPath));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/candidates', candidatesRouter);
app.use('/companies', companiesRouter);
app.use('/departments', departmentsRouter);
app.use('/jobs', jobsRouter);



app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
