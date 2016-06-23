function initConfig() {
    var configInfo = {
		versionCode : 51,
		versionName : '1.0-beta1',
		apkurl		: 'http://p.gdown.baidu.com/d2b6b847995ed8362cad84ffe1dc75aa39577faf354b397fca8a218c38c93909c9d0a389b47aa210402c4e624971dcf02e3ed69ebc4722f07e6569300d5277cd0cca2c99ff3a7720554e2678d3f7dc2e216e72043c8f4e7c9c8dbf3497efd7812c6e08a4871b07f6dcaf71cb95be27d5e4dc4ca5ffc22498047d56de290dcf46d141ba3bdcbaa744b73156ad19fbb1c77126de753fa64669511f7490482980021538926fee90cd008ec437bb7b1d823844efd179c08f53973fd5169b33fd70f47bb13c14afb9fd1399c60869c45765e88c1574581b9ee6e4b54a2580cd6ff1a2922b8086247c3261dc69c08615ece796',

        default_max_conns : 50,

        mysqlConfig       : {
              "host"      : "127.0.0.1",
              "user"      : "root",
              "password"  : "wangyi601466673",
              "database"  : "itone"
        },

        /*mysqlConfig       : {
           "host"      : "127.0.0.1",
            "user"      : "root",
            "password"  : "123",
            "database"  : "itone"
        },*/
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
