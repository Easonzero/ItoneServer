const proxy = require('../proxy/userProxy');
/**
 * Created by eason on 6/16/16.
 */

exports.run = ()=>{
    proxy.getUsersByOrder(function(err,result){
        if(err) {
            console.dir(err);
            return;
        }
        global.studentlist = result;
    });
};