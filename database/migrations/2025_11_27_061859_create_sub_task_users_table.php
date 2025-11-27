<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sub_task_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subtask_id')->constrained('sub_tasks')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('file')->nullable(); // optional uploaded file path
            $table->enum('status', ['pending', 'submitted', 'missing'])->default('pending');
            $table->dateTime('turned_in_at')->nullable(); // timestamp of submission
            $table->timestamps();

            $table->unique(['subtask_id', 'user_id']); // prevent duplicate entries
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sub_task_users');
    }
};
