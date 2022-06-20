const { format } = require("date-fns")
const { v4: uuid } = require("uuid")
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const logEvent = async(message, logName) => {
    const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, "...", "logs"))) {
            await fsPromise.mkdir(path.join(__dirname, "...", "logs"))
        }
        await fsPromise.appendFile(path.join(__diranme, "...", "logs", logName), logItem)
    } catch (error) {
        console.log(error)
    }
} 

const logger = (req, res, next) => {
    logEvent(`${req.method}\t${rq.headers.origin}\t${req.url}`, "reqLog.txt")
    console.log(`${req.method} ${req.path}`);
    next()
}

module.exports = {
    logEvent,
    logger
}