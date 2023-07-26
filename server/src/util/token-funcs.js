const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.generateAccessToken = dataToStore => {
    return jwt.sign(dataToStore, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100m', algorithm: 'HS512' });
}

exports.generateRefreshToken = dataToStore => {
    return jwt.sign(dataToStore, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d', algorithm: 'HS512' });
}

exports.generateResetToken = dataToStore => {
    return jwt.sign(dataToStore, process.env.RESET_TOKEN_SECRET, { algorithm: 'HS512' });
}

exports.verifyResetToken = token => {
    return jwt.verify(token, process.env.RESET_TOKEN_SECRET, { algorithm: 'HS512' }, (err, user) => {
        if (err) {
            err.statusCode = 403;
            return {
                type: 'error',
                err: err
            }
        }
        return {
            type: 'success',
            username: user.username,
            email: user.email
        }
    })
}


exports.verifyAccessToken = token => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS512' }, (err, user) => {
        if (err) {
            err.statusCode = 403;
            return {
                type: 'error',
                err: err
            }
        }
        return {
            type: 'success',
            username: user.username,
            userId: user.userId,
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            tenant: user.tenant,
            role: user.role,
            team: user.team,
            permissions: user.permissions
        }
    })
}


exports.verifyRefreshToken = token => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS512' }, (err, user) => {
        if (err) {
            err.statusCode = 403;
            return {
                type: 'error',
                err: err
            }
        }
        return {
            type: 'success',
            username: user.username,
            userId: user.userId,
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            tenant: user.tenant,
            role: user.role,
            team: user.team,
            permissions: user.permissions
        }
    })
}