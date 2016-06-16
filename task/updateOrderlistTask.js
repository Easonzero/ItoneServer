const proxy = require('../proxy/userProxy');
/**
 * Created by eason on 6/16/16.
 */

exports.run = (callback)=>{
    proxy.getUsersByOrder(function(err,result){
        if(err) {
            console.dir(err);
	    callback(err);
            return;
        }
        global.studentlist = result;
	callback(null);
    });
};
