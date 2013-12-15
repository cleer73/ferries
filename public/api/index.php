<?php

$appRoot = realpath(dirname(__FILE__).'/../App');

include "{$appRoot}/Autoload.php";

$app = new \Slim\Slim();

$app->get("/data/route/:route", function ($route) use ($app) {
    print('Hi! This will be route schedule data.');
});

$app->get("/data/alerts/:route", function ($route) use ($app) {
    print('Hi! These will be alerts someday.');
});

$app->run();
