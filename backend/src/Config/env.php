<?php
require_once __DIR__ . '/../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
// safeLoad : ne plante pas si .env est absent (dans Docker, les variables
// sont déjà fournies par docker-compose via "environment:")
$dotenv->safeLoad();
