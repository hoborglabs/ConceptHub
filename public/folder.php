<?php
$folder = $_GET['f'];
$home = realpath(__DIR__);
$target = realpath($home . '/' . $folder);

if (false === strpos($target, $home) || $home == $target) {
	echo json_encode(array(array('src' => '/error.png', 'name' => 'are you kidding me?')));
	return;
}

$files = scandir($target);
$extesions = array('png', 'jpg', 'jpeg', 'gif');
$return = array();
foreach ($files as $file) {
	if (is_file($target . '/' . $file)) {
		$ext = preg_replace('/.*?\.(.*)$/', '$1', $file);
		if (in_array($ext, $extesions)) {
			$return[] = array(
				'src' => $folder . '/' . $file,
				'name' => $file
			);
		}
	}
}
echo json_encode($return);