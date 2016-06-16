const http = require('http');
const querystring = require('querystring');
let options = null;
let postData = null;
/**
 * Created by eason on 6/15/16.
 */

function initSmsUtil(){
    options = {
        host:'api.weimi.cc',
        path:'/2/sms/send.html',
        method:'POST',
        agent:false,
        rejectUnauthorized : false,
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' :''
        }
    };
    postData = {
        uid:'dw7n0VIwcYXi',
        pas:'9rxvjuaj',
        mob:'',
        con:'',
        type:'json'
    };
}

function send(){
    let content = querystring.stringify(postData);
    options.headers['Content-Length'] = content.length;

    let req = http.request(options,function(res){
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
        });
        res.on('end',function(){
            console.log('over');
        });
    });
    req.write(content);
    req.end();
}

exports.sendSms = (mob,callback)=>{
    if(!options||!postData) initSmsUtil();

    if (!mob) {
        throw new InvalidParamError("the mob is empty");
    }
    
    let ckn='';
    for(var i=0;i<6;i++)
    {
        ckn+=Math.floor(Math.random()*10);
    }
    postData.mob = mob;
    postData.con = `【微米】您的验证码是：${ckn}，3分钟内有效。如非您本人操作，可忽略本消息。`;

    callback(ckn);

    send();
};
