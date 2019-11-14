const LOG_TIMESTAMP = parseInt(process.env.NODE_MESSENGER_LOG_TIMESTAMP || 0);
const LOG_JSON_SPACE = parseInt(process.env.NODE_MESSENGER_LOG_JSON_SPACE || 0);
const LOG_COLORS = parseInt(process.env.NODE_MESSENGER_LOG_COLORS || 0);
const LOG_TRUNCATE_STRING = parseInt(process.env.NODE_MESSENGER_LOG_TRUNCATE_STRING || 0);

const DEBUG_LEVEL   = "DEBUG";
const INFO_LEVEL    = " INFO";
const WARNING_LEVEL = " WARN";
const ERROR_LEVEL   = "ERROR";

class Logger {

    constructor(logLevel) {
        this.logDebug = logLevel === "debug";
        this.logInfo = logLevel === "debug";
        this.logWarning = logLevel === "debug" || logLevel === "warning";
        this.logError = logLevel !== "disabled";
    }

    debug(msg) {
        if(this.logDebug) {
            console.log(this.getTag(DEBUG_LEVEL), this.argumentsToString(arguments));
        }
    }

    info(msg) {
        if(this.logInfo) {
            console.log(this.getTag(INFO_LEVEL), this.argumentsToString(arguments));
        }
    }

    warn(msg) {
        if(this.logWarning) {
            console.warn(this.getTag(WARNING_LEVEL), this.argumentsToString(arguments));
        }
    }

    error(msg) {
        if(this.logError) {
            console.error(this.getTag(ERROR_LEVEL), this.argumentsToString(arguments));
        }
    }

    getTag(logLevel) {
        var tag = "";
        if(LOG_COLORS === 1) {
            if(logLevel === DEBUG_LEVEL) {
                tag += "\x1b[34m";  // Blue
            } else if(logLevel === INFO_LEVEL) {
                tag += "\x1b[32m";  // Green
            } else if(logLevel === WARNING_LEVEL) {
                tag += "\x1b[33m";  // Yellow
            } else {
                tag += "\x1b[31m";  // Red
            }
        } else if(LOG_COLORS === 2) {
            if(logLevel === DEBUG_LEVEL) {
                tag += "\x1b[38:5:25m";  // Blue
            } else if(logLevel === INFO_LEVEL) {
                tag += "\x1b[38:5:34m";  // Green
            } else if(logLevel === WARNING_LEVEL) {
                tag += "\x1b[38:5:214m";  // Yellow
            } else {
                tag += "\x1b[38:5:124m";  // Red
            }
        }
        if(LOG_TIMESTAMP === 1) {
            tag += "[ " + new Date().toJSON() + " " + logLevel + " ]";//.replace("T", " ").replace("Z", " UTC");
        } else {
            tag += "[ " + logLevel + " ]";
        }
        if(LOG_COLORS > 0) {
            tag += "\x1b[0m";
        }
        return tag;
    }

    argumentsToString(args) {
        var string = "";
        if(!args || args.length === 0) {
            return string;
        }
        for(let index in args) {
            if(string.length > 0) {
                string += " ";
            }
            var arg = args[index];
            if(arg instanceof Date) {
                string += arg.toJSON();
            } else if(arg instanceof RegExp) {
                string += arg;
            } else if(typeof arg === "object") {
                string += this.objectToString(arg);
            } else {
                string += arg;
            }
        }
        if(LOG_TRUNCATE_STRING > 0 && string.length > LOG_TRUNCATE_STRING) {
            string = string.substring(0, LOG_TRUNCATE_STRING) + "…";
        }
        return string;
    }

    getClassName(obj) {
        if(obj.constructor && obj.constructor.name) {
            return obj.constructor.name;
        }
        return "Object";
    }

    objectToString(obj) {
        if(!obj || obj.length === 0) {
            return "[ Invalid object ]";
        }
        if(obj instanceof Error) {
            return obj.stack;
        }
        return "[ " + this.getClassName(obj) + " ]";
//        return "[ " + this.getClassName(obj) + ": " + JSON.stringify(obj, this.jsonReplacer(), LOG_JSON_SPACE) + " ]";
    }

    jsonReplacer() {
        var objects = [];
        return (key, value) => {
//            console.log("REPLACER: key:", key, "value:", value, "objects:", objects);
            if(typeof value !== "object") {
                return value;
            }
            if(objects.indexOf(value) !== -1) {
                return "[ Circular: " + this.getClassName(value) + " ]";
            }
            objects.push(value);
            return value;
        };
    }

}

module.exports = Logger;