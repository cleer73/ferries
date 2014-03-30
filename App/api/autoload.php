<?php

// Update the include paths, just makes things easier.
set_include_path(implode(PATH_SEPARATOR, array(
  realpath(dirname(__FILE__).'/../'),
  get_include_path(),
)));

// Use the Composer Autoloader.
$loader = require_once 'vendor/autoload.php';
