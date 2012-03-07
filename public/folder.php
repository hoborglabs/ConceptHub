<?php

$folder = $_GET['f'];

$target = __DIR__ . '/' . $folder;

$files = scandir($target);
$return = array();
foreach ($files as $file) {
	if (is_file($target . '/' . $file)) {
		$return[] = $folder . '/' . $file;
	}
}
echo json_encode($return);