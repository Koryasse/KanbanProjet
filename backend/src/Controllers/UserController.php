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
        $data = $request->getParsedBody() ?? [];
        $name = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if ($name === '' || $email === '' || $password === '') {
            return $this->renderToJson($response, ['error' => 'Tous les champs sont obligatoires'], 400);
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->renderToJson($response, ['error' => 'Email invalide'], 400);
        }

        if (User::findByEmail($email)) {
            return $this->renderToJson($response, ['error' => 'Email déjà utilisé'], 400);
        }

        // Le mot de passe est stocké haché, jamais en clair
        $id = User::create($name, $email, password_hash($password, PASSWORD_DEFAULT));

        return $this->renderToJson($response, User::findById($id), 201);
    }

    // Permet de se connecter
    public function login(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody() ?? [];
        $user = User::findByEmail(trim($data['email'] ?? ''));

        if (!$user || !password_verify($data['password'] ?? '', $user['password'])) {
            return $this->renderToJson($response, ['error' => 'Email ou mot de passe incorrect'], 401);
        }

        unset($user['password']);
        return $this->renderToJson($response, $user);
    }
}
