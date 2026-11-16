<?php

namespace App\Models;

use App\Services\Database;

class Task
{
    public static function findByUser($userId)
    {
        $statement = Database::getConnection()->prepare('SELECT task_id AS id, title, status FROM tasks WHERE user_id = :userId');
        $statement->execute(['userId' => $userId]);
        return $statement->fetchAll();
    }

    public static function findById($id)
    {
        $statement = Database::getConnection()->prepare('SELECT task_id AS id, title, status FROM tasks WHERE task_id = :id');
        $statement->execute(['id' => $id]);
        return $statement->fetch();
    }

    public static function create($userId, $title, $status)
    {
        $pdo = Database::getConnection();
        $statement = $pdo->prepare('INSERT INTO tasks (user_id, title, status) VALUES (:userId, :title, :status)');
        $statement->execute(['userId' => $userId, 'title' => $title, 'status' => $status]);
        return $pdo->lastInsertId();
    }

    public static function update($id, $title, $status)
    {
        $statement = Database::getConnection()->prepare('UPDATE tasks SET title = :title, status = :status WHERE task_id = :id');
        $statement->execute(['title' => $title, 'status' => $status, 'id' => $id]);
    }

    public static function delete($id)
    {
        $statement = Database::getConnection()->prepare('DELETE FROM tasks WHERE task_id = :id');
        $statement->execute(['id' => $id]);
    }
}
