var express =require('express');
var app = express();


var todocontroller = require('./controllers/todocontroller.js');
todocontroller(app);

//setting up template engine(ejs)
app.set('view engine','ejs');

//to use static pages and css
app.use(express.static('./public'));

//listening to port
app.listen(3000);
console.log('listening to port 3000');
