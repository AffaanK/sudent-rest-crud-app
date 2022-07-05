const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const ejs = require('ejs')
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/students', require('./handlers/api/students'));
app.use('/students', require('./handlers/students'));

app.get('/', (req, res) => res.render('welcome'));


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));