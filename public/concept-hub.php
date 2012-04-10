<?php


// load config
$config = array();
if (is_readable(__DIR__ . '/../properties.ini')) {
	$config = parse_ini_file(__DIR__ . '/../properties.ini');
} else {
	if (is_readable(__DIR__ . '/../properties.default.ini')) {
		$config = parse_ini_file(__DIR__ . '/../properties.default.ini');
	}
}

if (empty($config)) {
	die('No Configuration found');
}

if (empty($config['app_dir'])) {
	$config['app_dir'] = __DIR__ . '/../php';
}

// display page scafold
include $config['app_dir'] . '/src/app.phtml';
