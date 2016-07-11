function initConfig() {
    var configInfo = {
        default_max_conns : 50,

        /*mysqlConfig       : {
              "host"      : "127.0.0.1",
              "user"      : "root",
              "password"  : "wangyi601466673",
              "database"  : "itone"
        },*/

        mysqlConfig       : {
           "host"      : "127.0.0.1",
            "user"      : "root",
            "password"  : "123",
            "database"  : "itone"
        },
        
        sessionConfig     : {
            secret      : '123456',
            resave      : false,
            saveUninitialized: true,
            cookie      :{
                maxAge: 1000*60*30
            }
        },

        statusCode        : {
            STATUS_OK              : 'ok',
            STATUS_ERROR           : 'error',
            STATUS_NOTFOUND           : 1, 
            STATUS_SERVER_ERROR       : 2,
            STATUS_INVAILD_PARAMS     : 3,
            STATUS_DBERROR            : 4
        }
    };
    return configInfo;
}

exports.initConfig = initConfig;
