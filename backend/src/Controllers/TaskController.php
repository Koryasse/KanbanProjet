<?php

namespace App\Controllers;

use App\Models\Task;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class TaskController extends RenderController
{
    // Récupère toutes les tâches
    public function getAllTasks(Request $request, Response $response, array $args): Response
    {
        $tasks = Task::findByUser($args['userId']);
        return $this->renderToJson($response, $tasks);
    }

    // Créer une tâche
    public function createTask(Request $request, Response $response, array $args): Response
    {
        $data = $request->getParsedBody();
        $id = Task::create($args['userId'], $data['title'], $data['status'] ?? 'todo');

        return $this->renderToJson($response, Task::findById($id), 201);
    }

    // Modifie une tâche
    public function updateTask(Request $request, Response $response, array $args): Response
    {
        $task = Task::findById($args['id']);
        if (!$task) {
            return $this->renderToJson($response, ['error' => 'Tâche introuvable'], 404);
        }

        $data = $request->getParsedBody();
        Task::update($args['id'], $data['title'] ?? $task['title'], $data['status'] ?? $task['status']);

        return $this->renderToJson($response, Task::findById($args['id']));
    }

    // Supprime une tâche
    public function deleteTask(Request $request, Response $response, array $args): Response
    {
        Task::delete($args['id']);
        return $this->renderToJson($response, ['message' => 'Tâche supprimée']);
    }
}
