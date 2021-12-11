const {assign} = require('lodash');

/**
 *
 * @param [options]
 * @param options.baseUrl
 * @param options.hostName
 * @param options.url
 * @param options.originalUrl
 * @param options.path
 * @param options.ip
 * @constructor
 */
function MockRequest(options) {
    assign(this, options);
}


function MockResponse() {
    this.headers = {};
    this.statusCode = null;
    this._data = null;
}

MockResponse.prototype.setHeader = function (name, value) {
    if (!this.headers) this.headers = {};
    this.headers[name.toLowerCase()] = value;
    return this;
};

MockResponse.prototype.sendStatus = function (status) {
    this.statusCode = status;
    return this;
};

MockResponse.prototype.status = function (status) {
    this.statusCode = status;
    return this;
};


MockResponse.prototype.send = function (data) {
    this._data = data;
    return this;
};

MockResponse.prototype.json = function (json) {
    this._data = json;
    return this;
};

module.exports = {
    Request: MockRequest,
    Response: MockResponse
}
