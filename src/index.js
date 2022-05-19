// core modules
const path = require('path');

// npm modules
require('dotenv').config()
const express = require('express');

const app = express();
// express config body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express config routers
const AccountRouter = require('./routers/AccountRouter');
const AdminRouter = require('./routers/AdminRouter');

app.use('/api/accounts', AccountRouter);
app.use('/api/admin', AdminRouter);

// Database 
const database = require('./repository/mongo/config/index');

// Directory define
const viewsDirectoryPath = path.join(__dirname, './views');
const publicDirectoryPath = path.join(__dirname, './public');

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', viewsDirectoryPath);

app.use(express.static(publicDirectoryPath));

// Routing
app.get('/', (req, res) => {
    // res.render('index', { port });
    res.render('register');
})

const port = process.env.PORT || 3000;
database.connect()
    .then(() => app.listen(port, () => console.log(`Express started on http://localhost:${port}; ` + 'press Ctrl-C to terminate. ')))
    .catch(e => console.log('Cannot connect to MongoDB Server: ' + e.message));