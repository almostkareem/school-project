const express = require('express');
const bodyParser = require('body-parser');
const patient = require('./routes/patient.route'); // Imports routes for the patients
const app = express();
const exphbs = require('express-handlebars');

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://user:user123@ds125871.mlab.com:25871/nabili_db';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use("/assets", express.static(__dirname + '/assets'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('index');
});

app.use('/patients', patient);


let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

