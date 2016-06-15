const app = require('../app');
const config = require('../config').initConfig().smsConfig;
let request = null;
let param = null;
/**
 * Created by eason on 6/15/16.
 */

function initSmsUtil(){
    request = app.client({host:config.host}).request('post',config.path);
    param = {
        uid:config.uid,
        pas:config.pas,
        type:config.type
    }
}

exports.sendSms = (mob,callback)=>{
    if(!request||!param) initSmsUtil();

    if (!mob) {
        throw new InvalidParamError("the mob is empty");
    }
    
    let ckn='';
    for(var i=0;i<6;i++)
    {
        ckn+=Math.floor(Math.random()*10);
    }
    param.mob = mob;
    param.con = `【微米】您的验证码是：${ckn}，3分钟内有效。如非您本人操作，可忽略本消息。`;
    request.setBody(param).end((res)=>{
        callback(ckn,res.bodyJSON());
    });
};