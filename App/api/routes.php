<?php

namespace App;

class Routes {
    public static function init($app) {
        $app->get("/data/route/:route", function ($route) use ($app) {
            print('Hi! This will be route schedule data.');
        });

        $app->get("/data/alerts/:route", function ($route) use ($app) {
            print('Hi! These will be alerts someday.');
        });
    }
}