<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubTaskUser extends Model
{
    protected $table = 'sub_task_users';

    protected $fillable = [
        'subtask_id',
        'user_id',
        'file',
        'status',
        'turned_in_at',
    ];

    public function subtask()
    {
        return $this->belongsTo(SubTask::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
