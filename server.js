const express = require('express');
const app = express();
const port = 1337;
const dir = __dirname + '/public/';

app.use(express.static('public'));
app.use(express.static('public/img'));

app.get('/', (request, response) => {
    response.sendFile(dir + 'index.html');
});
app.get('/index', (request, response) => {
    response.sendFile(dir + 'index.html');
});
app.get('/home', (request, response) => {
    response.sendFile(dir + 'index.html');
});
app.get('/header', (request, response) => {
    response.sendFile(dir + 'header.html');
});
app.get('/footer', (request, response) => {
    response.sendFile(dir + 'footer.html');
});
app.get('/pricing', (request, response) => {
    response.sendFile(dir + 'pricing.html');
});
app.get('/tee-times', (request, response) => {
    response.sendFile(dir + 'tee-times.html');
});
app.get('/calendar', (request, response) => {
    response.sendFile(dir + 'calendar.html');
});
app.get('/*', (request, response) =>{
    response.sendFile(dir + '404.html');
});

app.listen(port, () => {
console.log( `Listening on http://localhost:${port}, press ctrl+c to quit`);
});