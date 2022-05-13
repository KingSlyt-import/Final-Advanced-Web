// core modules
const path = require('path');

// npm modules
require('dotenv').config()
const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();
// express config body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express config routers
const AccountRouter = require('./routers/AccountRouter');
app.use('/api/accounts', AccountRouter);

// Database 
const database = require('./repository/mongo/config/index');

// Directory define
const viewsDirectoryPath = path.join(__dirname, './views');
const publicDirectoryPath = path.join(__dirname, './public');

// View Engine Setup
app.set('views', viewsDirectoryPath);
app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main',
    layoutsDir: viewsDirectoryPath + '/layouts',
    partialsDir: viewsDirectoryPath + '/partials',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(express.static(publicDirectoryPath));

const port = process.env.PORT || 3000;
database.connect()
    .then(() => app.listen(port, () => console.log(`Express started on http:/localhost:${port}; ` + 'press Ctrl-C to terminate. ')))
    .catch(e => console.log('Cannot connect to MongoDB Server: ' + e.message));