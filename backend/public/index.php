<?php

$app = AppFactory::create();
$app->addRoutingMiddleware();
$app->addBodyParsingMiddleware();
$app->addErrorMiddleware(true, true, true);
$routes = require __DIR__ . '/../src/Routes/routes.php';
$routes($app);
$app->run();