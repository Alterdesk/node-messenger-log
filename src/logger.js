class Logger {

    constructor(logLevel) {
        this.logDebug = logLevel === "debug";
        this.logInfo = logLevel === "debug";
        this.logWarning = logLevel === "debug" || logLevel === "warning";
        this.logError = logLevel !== "disabled";
    }

    debug(msg) {
        if(this.logDebug) {
            console.log("DEBUG", msg);
        }
    }

    info(msg) {
        if(this.logInfo) {
            console.log("INFO", msg);
        }
    }

    warn(msg) {
        if(this.logWarning) {
            console.warn("WARNING", msg);
        }
    }

    error(msg) {
        if(this.logError) {
            console.error("ERROR", msg);
        }
    }

}

module.exports = Logger;