const proxy = require('../proxy/userProxy');
/**
 * Created by eason on 6/16/16.
 */

exports.run = (callback)=>{
    proxy.refeshRank(function(err,result){
        if (err||!result) {
            console.dir(err);
	    	callback(err);
        }
    })
};
