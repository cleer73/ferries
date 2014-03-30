<?php

$appRoot = realpath(dirname(__FILE__).'/../app/api');

include "{$appRoot}/Autoload.php";

$app = new \Slim\Slim();

\App\Routes::init($app);

$app->run();
