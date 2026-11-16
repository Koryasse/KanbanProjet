<?php

namespace App\Controllers;

use App\Models\User;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController extends RenderController
{
    // Permet de s'inscrire
    public function register(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        if (User::findByEmail($data['email'])) {
            return $this->renderToJson($response, ['error' => 'Email déjà utilisé'], 400);
        }

        $id = User::create($data['name'], $data['email'], $data['password']);

        return $this->renderToJson($response, User::findById($id), 201);
    }

    // Permet de se connecter
    public function login(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        $user = User::findByEmail($data['email']);

        if (!$user || $user['password'] !== $data['password']) {
            return $this->renderToJson($response, ['error' => 'Email ou mot de passe incorrect'], 401);
        }

        unset($user['password']);
        return $this->renderToJson($response, $user);
    }
}
