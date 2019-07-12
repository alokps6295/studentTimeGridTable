import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

export default () => {
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logger/logsFile.log'), { flags: 'a' })
    return morgan(function(tokens, req, res) {
        return [
            'remote-addr : ', tokens['remote-addr'](req, res), ' , ',
            'remote-user : ', tokens['remote-user'](req, res), ' , ',
            'user-agent : ', tokens['user-agent'](req, res), ' , ',
            'date : ', tokens.date(req, res), ' , ',
            'method : ', tokens.method(req, res), ' , ',
            'url : ', tokens.url(req, res), ' , ',
            'http-version :', tokens['http-version'](req, res), ' , ',
            'status : ', tokens.status(req, res), ' , ',
            'content-length : ', tokens.res(req, res, 'content-length'), ' , ',
            'response-time : ', tokens['response-time'](req, res), 'ms \n',
        ].join('')
    }, { stream: accessLogStream });
}