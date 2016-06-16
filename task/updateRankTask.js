const proxy = require('../proxy/userProxy');
/**
 * Created by eason on 6/16/16.
 */

exports.run = ()=>{
    proxy.refeshRank(function(err,result){
        if (err||result.length === 0) {
            console.dir(err);
        }
    })
};