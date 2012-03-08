<?php

$folder = $_GET['f'];

$target = __DIR__ . '/' . $folder;

$files = scandir($target);
$return = array();
foreach ($files as $file) {
	if (is_file($target . '/' . $file)) {
		$return[] = array(
			src => $folder . '/' . $file,
			name => $file
		);
	}
}
echo json_encode($return);