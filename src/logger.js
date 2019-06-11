const LOG_TIMESTAMP = process.env.NODE_MESSENGER_LOG_TIMESTAMP || 0;

class Logger {

    constructor(logLevel) {
        this.logDebug = logLevel === "debug";
        this.logInfo = logLevel === "debug";
        this.logWarning = logLevel === "debug" || logLevel === "warning";
        this.logError = logLevel !== "disabled";
    }

    debug(msg) {
        if(this.logDebug) {
            console.log(this.getTag("DEBUG"), this.argumentsToString(arguments));
        }
    }

    info(msg) {
        if(this.logInfo) {
            console.log(this.getTag("INFO"), this.argumentsToString(arguments));
        }
    }

    warn(msg) {
        if(this.logWarning) {
            console.warn(this.getTag("WARNING"), this.argumentsToString(arguments));
        }
    }

    error(msg) {
        if(this.logError) {
            console.error(this.getTag("ERROR"), this.argumentsToString(arguments));
        }
    }

    getTag(logLevel) {
        if(LOG_TIMESTAMP === 1) {
            return "[ " + new Date().toJSON() + " " + logLevel + " ]";
        }
        return "[ " + logLevel + " ]";
    }

    argumentsToString(args) {
        var string = "";
        if(!args || args.length === 0) {
            if(string.length > 0) {
                string += " ";
            }
            return string;
        }
        for(let index in args) {
            string += args[index];
        }
        return string;
    }

}

module.exports = Logger;