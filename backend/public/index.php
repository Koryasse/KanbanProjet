<?php

use App\Middlewares\CorsMiddleware;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/Config/env.php';

$app = AppFactory::create();

// Permet de lire le JSON envoyé par le frontend
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);
// Ajouté en dernier = exécuté en premier : les réponses d'erreur ont aussi les en-têtes CORS
$app->add(new CorsMiddleware());

$routes = require __DIR__ . '/../src/Routes/routes.php';
$routes($app);

$app->run();