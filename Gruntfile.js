/**
 * Created by eason on 5/31/16.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg     : grunt.file.readJSON("package.json"),

        //task : uglify config
        // uglify  : {
        //     options     : {
        //         banner  : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //     },
        //     js          : {
        //         src     : "public/src/javascript/*.js",
        //         dest    : "public/target/javascript/gift.min.js"
        //     },
        //     css         : {
        //         src     : "public/src/stylesheets/*.css",
        //         dest    : "public/target/stylesheets/gift.min.css"
        //     }
        // },

        //task : jshint config
        jshint  : {
            options     : {

                //ignore:Don't make functions within a loop.
                '-W083' : true,
                //ignore:__proto__
                '-W103' : true,

                globals : {
                    /*  node global below   */
                    process             : true,
                    global              : true,
                    module              : true,
                    __dirname           : true,
                    require             : true,
                    console             : true,
                    exports             : true,
                    /*      debug below      */
                    debugCtrller        : true,
                    debugProxy          : true,
                    debugLib            : true,
                    debugTest           : true,
                    debugOther          : true,
                    /*      Error below      */
                    BaseError           : true,
                    ServerError         : true,
                    InvalidParamError   : true,
                    DataNotFoundError   : true,
                    PageNotFoundError   : true,
                    DBError             : true,
                    /*      test below       */
                    describe            : true,
                    before              : true,
                    after               : true,
                    it                  : true
                },
                ignores : [
                    "public/src/libs/*.js",
                    "public/target/*.js"
                ]
            },
            src         : [
                "routes/*.js",
                "controllers/*.js",
                "proxy/*.js",
                "common/*.js",
                "utils/*.js",
                "test/*.js",
                "routes.js",
                "config.js",
                "app.js"
            ]
        }
    });

    //load tasks
    //grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    //register task as default
    grunt.registerTask("default", ['jshint']);
};