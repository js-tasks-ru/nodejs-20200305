module.exports = function mongooseValidationErrorMiddleware(statusCode) {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err.name !== 'ValidationError') throw err;
      
      ctx.status = statusCode;
      ctx.body = Object.keys(err.errors).map(key => `ошибка в поле ${key} - ${err.errors[key]}`);
    }
  }
};
