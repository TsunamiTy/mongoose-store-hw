// ====dependencies====
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Product = require('./models/products.js');
const methodOverride = require('method-override')
const app = express();
const productController = require('./controllers/product.js')
require('dotenv').config();

app.set('view engine', 'ejs');

const { PORT = 3000, DATABASE_URL } = process.env;

// ====database connection====
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

// ====listener====

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));

// ====database connection error/success====
// define callback functions for various events====

db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconected', () => console.log('mongo disconnected'));

// ====middleware====
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

// ====routes====
app.use('/products', productController);
app.get('/', (req, res) => {
    res.redirect('/products')
});

// app.get('/*', (req, res) => {
//     res.render('404.ejs');
// });