var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var message = require('./routes/message');
var homework = require('./routes/homework');
var advice = require('./routes/advice');
//var tribune = require('./routes/tribune');
var constvar = require('./routes/constvar');

module.exports = function(app){
  //check islogin
  /*app.use(function (req, res, next) {
      var url = req.originalUrl;
      var checkurl = (url != "/users/login"&&url != "/"
      &&url != "/users/register"&&url != "");
      if (checkurl && !req.session.user) {
          return res.send('no login');
      }
      next();
  });*/

  //api
  app.use('/', index);
  app.use('/users', users);
  app.use('/books',books);
  app.use('/advice',advice);
  app.use('/message',message);
  app.use('/homework',homework);
  //app.use('/QA',tribune);
  app.use('/base',constvar);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
};