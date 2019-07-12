import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/constants';

export const generateToken = (id) => {
    let token = jwt.sign({ id: id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expireTime
    });
    return token;
}

export const verifyToken = (req) => {
    let obj = {
        'err': null,
        'data': null
    };

    let token = req.headers['x-access-token'];
    if (!token) {
        obj.err = { auth: false, message: 'No token provided.' };
        return obj;
    }

    return jwt.verify(token, jwtConfig.secret, function(err, decoded) {
        if (err) {
            obj.err = { auth: false, message: 'Failed to authenticate token.' }; // token expire or wrong
            return obj;
        }
        obj.data = decoded;
        return obj;
    });
}