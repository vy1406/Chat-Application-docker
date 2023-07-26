exports.validErrors = errors => {
    if (!errors.isEmpty()) {
        const msg = errors.array().map(err => err.msg);
        const error = new Error(msg.join('\n'));
        error.data = errors.array();
        error.statusCode = 422
        throw error;
    }
}

exports.nextError = (error, next) => {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    next(error);
}