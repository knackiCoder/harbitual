const Mongoose = require("mongoose");

const DB = async (url) => (
    await Mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //useFindAndModify: false
    })
    .then(() => console.log('Database connected'))
	.catch(err => console.log(err))
);

module.exports = DB;
