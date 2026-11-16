<?php

use Slim\App;
use Slim\Routing\RouteCollectorProxy;
use App\Controllers\UserController;
use App\Controllers\TaskController;

return function (App $app) {
    $app->group('/api', function (RouteCollectorProxy $group) {
        // Utilisateurs
        $group->post('/register', [UserController::class, 'register']);
        $group->post('/login', [UserController::class, 'login']);

        // Tâches
        $group->get('/users/{userId}/tasks', [TaskController::class, 'getAllTasks']);
        $group->post('/users/{userId}/tasks', [TaskController::class, 'createTask']);
        $group->put('/tasks/{id}', [TaskController::class, 'updateTask']);
        $group->delete('/tasks/{id}', [TaskController::class, 'deleteTask']);
    });
};
