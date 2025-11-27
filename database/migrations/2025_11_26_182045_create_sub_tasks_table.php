<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subtasks', function (Blueprint $table) {
            $table->id();

            // Link to main task
            $table->foreignId('task_id')->constrained()->onDelete('cascade');

            // Subtask details
            $table->string('title');         // e.g., "Task 1", "Task 2"
            $table->text('description')->nullable();

            // Order to determine sequence
            $table->integer('order')->default(1);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subtasks');
    }
};
