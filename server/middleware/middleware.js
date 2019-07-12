import { verifyToken } from '../helpers/jwt';
import { success, failure } from '../helpers/sendResponse';

const middleware = {
    testMiddleware: function(req, res, next) {
        console.log(new Date(), req.method, req.url);
        next();
    },
    authenticate: function(req, res, next) {
        console.log('User arrived for verification');
        let jwtResp = verifyToken(req);
        if (jwtResp.err) {
            failure(res, jwtResp.err);
        } else {
            next();
        }
    }
}

module.exports = middleware;
export default module.exports;