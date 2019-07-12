const errCodes = {
    '200': 'OK',
    '201': 'Created',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '408': 'Request Time-out',
    '413': 'Request Entity Too Large',
    '415': 'Unsupported Media Type',
    '500': 'Internal Server Error',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Time-out',
    '511': 'Network Authentication Required',
    '600': 'Some error in fetching data'
}

module.exports = errCodes;
export default errCodes