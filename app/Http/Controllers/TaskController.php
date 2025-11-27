<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();

        return Inertia::render('task', compact('tasks'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'class_name' => 'required|string|max:255',
        ]);

        // Create the task
        $task = Task::create([
            'subject' => $validated['subject'],
            'class_name' => $validated['class_name'],
        ]);

        // If using Inertia + React, return a redirect or JSON
        return back()->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task->load(['subtasks' => function ($query) {
            $query->orderBy('order');
        }]);

        return Inertia::render('show-task', [
            'task' => $task,
            'subtasks' => $task->subtasks,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
