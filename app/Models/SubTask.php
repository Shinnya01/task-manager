<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subtask extends Model
{
    protected $fillable = ['task_id', 'title', 'description', 'order'];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
