<?php

namespace App\Models;

use App\Services\Database;

class User
{
    public static function findById($id)
    {
        $statement = Database::getConnection()->prepare('SELECT user_id, name, email FROM users WHERE user_id = :userId');
        $statement->execute(['userId' => $id]);
        return $statement->fetch();
    }

    public static function findByEmail($email)
    {
        $statement = Database::getConnection()->prepare('SELECT * FROM users WHERE email = :email');
        $statement->execute(['email' => $email]);
        return $statement->fetch();
    }

    public static function create($name, $email, $password)
    {
        $pdo = Database::getConnection();
        $statement = $pdo->prepare('INSERT INTO users (name, email, password) VALUES (:name, :email, :password)');
        $statement->execute(['name' => $name, 'email' => $email, 'password' => $password]);
        return $pdo->lastInsertId();
    }
}
