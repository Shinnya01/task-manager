<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    
    protected $fillable = ['subject', 'class_name'];

    public function subtasks()
    {
        return $this->hasMany(Subtask::class);
    }
}
