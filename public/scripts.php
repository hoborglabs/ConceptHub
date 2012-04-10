<?php

define('VENDORS', '/var/www/vendors');
define('APP_ROOT', __DIR__ . '/../');
require_once VENDORS . '/symfony2/src/Symfony/Component/ClassLoader/UniversalClassLoader.php';

use Symfony\Component\ClassLoader\UniversalClassLoader;
$loader = new UniversalClassLoader();
$loader->registerNamespaces(array(
	'Symfony' => array(VENDORS . '/symfony2/src'),
	'Assetic' => '/Users/oledzkiw/Workspace/assetic/src',
));
$loader->register();

use \Symfony\Component\Yaml\Yaml;
use \Assetic\FilterManager;
use \Assetic\AssetManager;
use \Assetic\Filter\MustacheFilter;
use \Assetic\Factory\AssetFactory;

$path = $_SERVER['PATH_INFO'];
if (is_readable(__DIR__ . $path)) {
	header('Status: 302');
	header("Location: {$path}");
	exit;
}

$parts = preg_split('/\//', $path);
$assetName = array_pop($parts);
$type = 'scripts';
$config = Yaml::parse(APP_ROOT . '/php/config/assets.yml');

if (empty($config[$type][$assetName])) {
	echo "// no assets configuration found for `{$assetName}`";
}

$defaults = array(
	'root' => __DIR__,
	'files' => array(),
	'filters' => array()
);
$assetConf = $config[$type][$assetName] + $defaults;

$fm = new FilterManager();
$fm->set('mustache', new MustacheFilter('.js.html', 'window.TPL'));
$am = new AssetManager();
$factory = new AssetFactory($assetConf['root']);
$factory->setAssetManager($am);
$factory->setFilterManager($fm);

$asset = $factory->createAsset(
	$assetConf['files'],
	$assetConf['filters']
);

echo $asset->dump();