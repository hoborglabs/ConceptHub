/**
 * HoborgLabs - Concept Hub
 * REST API
 */

// use
var express = require('express');
var project = require('./api/project');

var api = express.createServer();
var interfaceConfig = {
	port: 5050,
	host: 'localhost',
};

api.get('/project/:projectId', project.get);

api.listen(interfaceConfig.port, interfaceConfig.host);
console.info('API interface started on ' + interfaceConfig.host + ':' + interfaceConfig.port);