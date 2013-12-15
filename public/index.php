<?php

$appRoot = realpath(dirname(__FILE__).'/../App');
include "{$appRoot}/Autoload.php";

$app = new \Slim\Slim();

$app->get("/data/route/:route", function ($route) use ($app) {
    print('Hi!');
});

$app->run();
