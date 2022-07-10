const globalErrorHandler = (err,req,res,next) => {
    err.statuCode = err.statusCode || 500;
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
      });
}

export default globalErrorHandler