require("dotenv").config();
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});
// mongoose.connect('mongodb://127.0.0.1:27017/nafeijuca?compressors=zlib&gssapiServiceName=mongodb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(1234);