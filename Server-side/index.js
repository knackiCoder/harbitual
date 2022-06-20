require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const Limiter = require("express-rate-limit");
const xss = require("xss-clean");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const corsOptions = require("./middleware/corsOption")
// const { logger } = require("./middleware")



//custom middleware logger
// app.use(logger)
const corsConfig = {
    origin: true,
    credentials: true
};

//Middleware
app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());
app.use(morgan("dev"))
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(cors(corsConfig));
app.use(fileUpload());
app.options("*", cors(corsConfig))

//For serving static files like images and css  
//app.use(express.static(path.join(__dirname, "/public")));

const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//Database
const Database = require("./db/connect")

app.use(xss());
app.use(helmet());
app.use(Limiter({
    windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
    max: 150,
    message: "You've exceeded 100 requests in 12 hours limit",
    headers: true
}));

const PORT = 5000;
const start = async () => {
    try {
        const connect = await Database(process.env.MONGO_URI)        
        app.listen(PORT, console.log(`Your server is running on port ${PORT}`))
    } catch (error) {
       console.log(err)
    }
}

start();