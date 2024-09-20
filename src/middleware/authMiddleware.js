
const catchAsync = require('./../utils/catchAsync')
const util = require('util');

exports.authMiddleware = catchAsync(async (req, res, next) => {
  next();
})