/**
 * Created by eason on 5/31/16.
 */
exports.generateRes = function (data, resCode) {
    return {
        statusCode  : resCode,
        data        : data
    };
};