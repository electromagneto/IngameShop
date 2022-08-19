'use strict';

class AdminController {
  static home(req,res,next) {
    res.send('Hello World');
    next();
  }
}

module.exports = AdminController