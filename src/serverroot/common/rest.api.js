/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

var http = require('http'),
	config = require('../../../config/config.global.js'),
	logutils = require('../utils/log.utils'),
	messages = require('./messages'),
	appErrors = require('../errors/app.errors'),
	util = require('util'),
    commonUtils = require('../utils/common.utils'),
    restler = require('restler');

if (!module.parent) {
	logutils.logger.warn(util.format(messages.warn.invalid_mod_call, module.filename));
	process.exit(1);
}

/**
 * Constructor to API server access.
 * @param {Object} Parameters required to define a new API server
 */
function APIServer(params) {
	var self = this;
	self.hostname = params.server;
	self.port = params.port;
	self.xml2jsSettings = params.xml2jsSettings || {};
	self.api = new self.API(self, params.apiName);
}

/**
 * Authenticate and call the callback function on successful authentication.
 * @param {Function} Callback function
 */
APIServer.prototype.authorize = function (callback) {
	var self = this;
	// TODO: Implement Authentication.
	self.cb(callback);
};

/**
 * Constructor to API.
 * @param {Object} API server object
 * @param {String} Name of the API
 */
APIServer.prototype.API = function (self, apiName) {
	return {
		hostname:self.hostname,
		port:self.port,
		name:apiName,
		get:function (url, callback, headers) {
			var s = this,
				obj = { url:s.hostname, path:url, method:'GET', port:s.port, 
				        headers:headers, xml2jsSettings:self.xml2jsSettings };
			self.makeCall(restler.get, obj, callback);
		},
		post:function (url, data, callback, headers) {
			var s = this,
				obj = { url:s.hostname, path:url, method:'POST', port:s.port, 
				        data:data, headers:headers,
                        xml2jsSettings:self.xml2jsSettings};
			self.makeCall(restler.post, obj, callback);
		},
		put:function (url, data, callback, headers) {
			var s = this,
				obj = { url:s.hostname, path:url, method:'PUT', port:s.port, 
				        data:data, headers:headers,
                        xml2jsSettings:self.xml2jsSettings };
			self.makeCall(restler.put, obj, callback);
		},
		delete:function (url, callback, headers) {
			var s = this,
				obj = { url:s.hostname, path:url, method:'DELETE', port:s.port,
				        headers:headers , xml2jsSettings:self.xml2jsSettings};
			self.makeCall(restler.del, obj, callback);
		}
	};
};

/**
 * Check if given callback is a function and call it.
 * @param {Function} Callback function
 */
APIServer.prototype.cb = function (cb) {
	if (typeof cb == 'function') {
		cb();
	}
};

/**
 * Make a call to API server.
 * @param {restApi} {function} restler API based on method
 * @param {params} {object} Parameters 
 * @param {callback} {function} Callback function once response comes 
          from API Server
 */
APIServer.prototype.makeCall = function (restApi, params, callback) {
    var self = this;
    var options = {};
    var data = commonUtils.getApiPostData(params['path'], params['data']);
    var method = params['method'];
    var xml2jsSettings = params['xml2jsSettings'];     
    options['headers'] = params['headers'] || {};
    options['data'] = data || {};
    options['method'] = method;
    options['headers']['Content-Length'] = (data) ? data.toString().length : 0;
    
    if ((method == 'POST') || (method == 'PUT')) {
        /* When we need to send the data along with options (POST/PUT)
           we need to specify the Content-Type as App/JSON with JSON.stringify
           of the data, otherwise, restler treats it as
           application/x-www-form-urlencoded as Content-Type and encodes
           the data accordingly
         */
        options['headers']['Content-Type'] = 'application/json';
    }
    options['parser'] = restler.parsers.auto;
    var reqUrl = global.HTTP_URL + params.url + ':' + params.port + params.path;
    restApi(reqUrl, options).on('complete', function(data, response) {
        if (data instanceof Error ||
            parseInt(response.statusCode) >= 400) {
            logutils.logger.error('URL [' + reqUrl + ']' + 
                                  ' returned error [' + data + ']');
            /* Invalid data, throw error */
            error = new
//            appErrors.RESTServerError(util.format(messages.error.invalid_json_xml,
  //                                                params.url, data));
            appErrors.RESTServerError(util.format(data));
            error['custom'] = true;
            error['responseCode'] = ((null != response) && 
                                     (null != response.statusCode)) ?
                                     response.statusCode :
                                     global.HTTP_STATUS_INTERNAL_ERROR;
            callback(error, '', response);
        } else {
            /* Data is xml/json format */
            restler.parsers.xml(data, function(err, xml2JsonData) {
                if (err) {
                    /* This MUST be a JSON response, response can be 
                     * JSON.stringify (if auto), else parsed if (json)
                     */
                    try {
                        var JSONData = JSON.parse(data);
                        callback(null, JSONData, response);
                    } catch(e) {
                        callback(null, data, response);
                    }
                } else {
                    /* XML Response */
                    callback(null, xml2JsonData, response);
                }
            }, xml2jsSettings);
        }
    });
}

// Export this as a module.
module.exports.getAPIServer = function (params) {
	return new APIServer(params);
};
