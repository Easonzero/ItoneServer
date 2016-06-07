function initConfig() {
    var configInfo = {

        default_max_conns : 50,

        mysqlConfig       : {
              "host"      : "127.0.0.1",
              "user"      : "root",
              "password"  : "wangyi601466673",
              "database"  : "itone"
        },

        //mysqlConfig       : {
        //    "host"      : "127.0.0.1",
        //    "user"      : "root",
        //    "password"  : "123",
        //    "database"  : "itone"
        //},

        statusCode        : {
            STATUS_OK              : 'ok',
            STATUS_ERROR           : 'error'
        },
    };
    return configInfo;
}

//exports
exports.initConfig = initConfig;
