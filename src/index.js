// core modules
const path = require('path');

// npm modules
const express = require('express');
const expressHandlebars = require('express-handlebars');
const req = require('express/lib/request');

const app = express();
const port = process.env.PORT || 3000;

// Directory define
const viewsDirectoryPath = path.join(__dirname, '../views');
const publicDirectoryPath = path.join(__dirname, '../public');

// View Engine Setup
app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main',
    partialsDir: viewsDirectoryPath + '/partials',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

// Express Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(publicDirectoryPath));

// Routing
app.get('/', (req, res) => {
    res.render('test', {
        title: 'Homepage'
    });
})

// Error Handle Page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Page not found'
    });
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
});

app.listen(port, () => {
    console.log(`Express started on http:/localhost:${port}; ` + 'press Ctrl-C to terminate. ');
});