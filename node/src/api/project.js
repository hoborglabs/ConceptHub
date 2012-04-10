/**
 * Project API
 */

// uses
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var options = {
	projectsRoot: '/var/www/ideashare.local/htdocs/demo',
	extensions: ['.jpg', '.jpeg', '.png', '.svg', '.gif']
};
var exports = module.exports;

// project API
exports.get = get;

function get(req, res) {
	id = req.params.projectId;
	projectDir = path.join(options.projectsRoot, id);

	// get list of images
	files = fs.readdirSync(projectDir);
	data = [];
	_.each(files, function(file) {
		if (_.include(options.extensions, path.extname(file))) {
			data.push({name: file, src: path.join(id, file)});
		}
	});

	// send response
	res.json(data);
}
