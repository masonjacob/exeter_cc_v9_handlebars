const express = require('express');
const app = express();
const port = 1337;
const dir = __dirname + '/public/';

const handlebars = require('express-handlebars').create({defaultLayout: false});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(express.static('public'));
app.use(express.static('public/css'));
app.use(express.static('public/images'));
app.use(express.static('public/js'));

app.get('/', (request, response) => {
    response.render('index', {
        title: 'Home' 
    });
});
app.get('/index', (request, response) => {
    response.render('index', {
        title: 'Home' 
    });
});
app.get('/home', (request, response) => {
    response.render('index', {
        title: 'Home' 
    });
});
app.get('/pricing', (request, response) => {
    response.render('pricing', {
        title: 'Pricing' 
    });
});
app.get('/tee-times', (request, response) => {
    response.render('tee-times', {
        title: 'Tee Times' 
    });
});
app.get('/calendar', (request, response) => {
    response.render('calendar', {
        title: 'Calendar' 
    });
});
app.get('/header', (request, response) => {
    response.sendFile(dir + 'header.html');
});
app.get('/footer', (request, response) => {
    response.sendFile(dir + 'footer.html');
});

app.use((request, response) =>{
    response.status(404);
    response.render('404', {title: 'Not Found'});
});
app.use((request, response) =>{
    response.status(500);
    response.render('500');
});

app.listen(port, () => {
console.log( `Listening on http://localhost:${port}, press ctrl+c to quit`);
});