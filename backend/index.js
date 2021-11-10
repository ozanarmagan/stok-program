let mongoose = require('mongoose');
let express = require('express');
const cors = require('cors');
let path = require('path');

const constants = require('./constants/index');
const admin = require('./utility/adminPage');
let apiRoutes = require('./api-routes');

var port = constants.port || 8080;
const app = express();

mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Baglantisi basarili')).catch(err => console.log(err))

app.use("/admin", admin)
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => { res.send('API') });

app.use('/images', express.static(path.join(__dirname + '/images')));
app.use('/api', apiRoutes);


app.listen(port, function () {
    console.log("Calisilan port : " + port);
});