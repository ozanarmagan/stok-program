
const constants = require('./constants/index');

let express = require('express');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({
    extended:false
}));

var port = constants.port || 8080;

app.get('/',(req,res) => { res.send('API')});

app.listen(port, function () {
    console.log("Calisilan port : " + port);
});

let apiRoutes = require('./api-routes');

app.use('/api',apiRoutes);


let mongoose = require('mongoose');

mongoose.connect(constants.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true});

var db = mongoose.connection;



if(!db)
    console.log('DB Baglanti hatasi');
else
    console.log('DB Baglantisi basarili');
