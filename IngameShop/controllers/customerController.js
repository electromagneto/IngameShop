'use strict';

class CustumerController {
  static home(req,res,next) {
    res.send('Hello World');
    next();
  }
}

module.exports = CustumerController