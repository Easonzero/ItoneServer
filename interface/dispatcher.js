var EventProxy  = require("eventproxy");
/**
 * Created by eason on 6/1/16.
 */
var ep = EventProxy.create();

//todo

module.exports = function(university) {
    ep.emit(university);
}