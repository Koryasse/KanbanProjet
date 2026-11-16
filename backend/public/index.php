<?php

use App\Middlewares\CorsMiddleware;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/Config/env.php';

$app = AppFactory::create();

// Permet de lire le JSON envoyé par le frontend avec $request->getParsedBody()
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->add(new CorsMiddleware());
$app->addErrorMiddleware(true, true, true);

$routes = require __DIR__ . '/../src/Routes/routes.php';
$routes($app);

$app->run();
