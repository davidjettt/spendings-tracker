const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const csurf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const db = require('./models')
const { ValidationError } = require('sequelize');
require('dotenv').config()

const { environment } = require('./config')

const isProduction = environment === 'production'


const app = express()
const routes = require('./routes')

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

if (!isProduction) app.use(cors())

app.use(
    helmet.crossOriginResourcePolicy({
        policy: 'cross-origin'
    })
)

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true
        }
    })
)

db.sequelize.sync()
    .then(() => {
        console.log('Synced db')
    })
    .catch((err) => {
        console.log('Failed to sync db' + err.message)
    })




app.use(routes)

app.get('/test', (req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    res.send('hello world')
})


// app.get('/', (req, res) => {
//     res.json({message: 'Testing'})
// })

// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
  });

// Process Sequelize Errors
app.use((err, _req, _res, next) => {
// check if error is a Sequelize error:
if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
}
next(err);
});

// Error Formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app
