const fs = require('fs');
/**
 * Created by eason on 6/17/16.
 */
let req = null,
    res = null;

module.exports.download = (_req,_res,filePath,callback)=>{
    req = _req;
    res = _res;

    fs.exists(filePath, (exist)=>{
        if(exist) {
            init(filePath, (config)=>{
                let fReadStream = fs.createReadStream(filePath, {
                    encoding : 'binary',
                    bufferSize : 1024 * 1024,
                    start : config.startPos,
                    end : config.fileSize
                });
                fReadStream.on('data', function(chunk) {
                    res.write(chunk, 'binary');
                });
                fReadStream.on('end', function() {
                    res.end();
                    callback();
                });
            });
        } else {
            console.log('文件不存在！');
            return;
        }
    });
};

function calStartPosition(Range){
    let startPos = 0;
    if( typeof Range != 'undefined') {
        let startPosMatch = /^bytes=([0-9]+)-$/.exec(Range);
        startPos = Number(startPosMatch[1]);
    }
    return startPos;
};

function configHeader(Config){
    let startPos = Config.startPos,
        fileSize = Config.fileSize,
        path = Config.path;

    res.attachment(path);

    if(startPos == 0) {
        res.append('Accept-Range', 'bytes');
    } else {
        res.append('Content-Range', 'bytes ' + startPos + '-' + (fileSize - 1) + '/' + fileSize);
    }
    res.writeHead(206, 'Partial Content', {
        'Content-Type' : 'application/octet-stream'
    });
};

function init(filePath, down){
    let config = {};
    fs.stat(filePath, function(error, state) {
        if(error)
            throw error;

        config.fileSize = state.size;
        config.path = filePath;
        let range = req.headers.range;
        config.startPos = calStartPosition(range);
        configHeader(config);
        down(config);
    });
};
