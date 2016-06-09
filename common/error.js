/**
 * Created by eason on 6/9/16.
 */
var config = require("../config").initConfig();
var util   = require("util");

function DataNotFoundError(message) {
    Error.call(this);
    this.name       = "DataNotFoundError";
    this.message    = message || "Data not found Error.";
    this.statusCode = config.statusCode.STATUS_NOTFOUND;
}

util.inherits(DataNotFoundError, Error);

function ServerError(message) {
    Error.call(this);
    this.name       = "ServerError";
    this.message    = message || "Server Error";
    this.statusCode = config.statusCode.STATUS_SERVER_ERROR;
}

util.inherits(ServerError, Error);

function InvalidParamError(message) {
    Error.call(this);
    this.name       = "InvalidParamError";
    this.message    = message || "InvalidParam Error";
    this.statusCode = config.statusCode.STATUS_INVAILD_PARAMS;
}

util.inherits(InvalidParamError, Error);

function PageNotFoundError (message) {
    Error.call(this);
    this.name       = "PageNotFoundError";
    this.message    = message || "InvalidParam Error";
    this.statusCode = 404;
}

util.inherits(PageNotFoundError, Error);

function DBError (message) {
    Error.call(this);
    this.name       = "DBError";
    this.message    = message || "DBError";
    this.statusCode = config.statusCode.STATUS_DBERROR;
}

util.inherits(DBError, Error);

global.ServerError       = ServerError;
global.InvalidParamError = InvalidParamError;
global.DataNotFoundError = DataNotFoundError;
global.PageNotFoundError = PageNotFoundError;
global.DBError           = DBError;