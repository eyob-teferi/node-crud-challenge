const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const personsRoute=require('./routes/person')
const errorHandler=require('./middlewares/error');
const notFoundHandler=require('./middlewares/notFound');


const app = express();
app.use(bodyParser.json());
app.use(cors());

let persons = [] //This is your in memory database

app.set('db', persons)
//TODO: Implement crud of person

app.use('/person',personsRoute(app));
app.use(notFoundHandler);
app.use(errorHandler);



if (require.main === module) {
    app.listen(3000)
}

module.exports = app;