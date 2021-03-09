const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost/AdSite';

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,

})
    .then(()=> console.log("Connected"))
    .catch((err)=> console.error(err));