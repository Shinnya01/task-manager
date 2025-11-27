<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    
    protected $fillable = ['subject', 'class_name'];

    public function subtasks()
    {
        return $this->hasMany(Subtask::class)->orderBy('order');
    }

    // In App\Models\Task.php
    public function users()
    {
        return $this->belongsToMany(User::class, 'task_user', 'task_id', 'user_id');
    }


}
