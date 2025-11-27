import AppLayout from "@/layouts/app-layout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";

type SubtaskType = {
  id: number;
  title: string;
  description: string | null;
  order: number;
  due_date: string;
  status: string;
  users: SubtaskUserType[]; // users who completed this subtask
};

type SubtaskUserType = {
  id: number;
  pivot: {
    status: 'pending' | 'submitted' | 'missing';
    file?: string | null;
    turned_in_at?: string | null;
  };
};


type TaskType = {
  id: number;
  subject: string;
  class_name: string;
  subtasks: SubtaskType[];
  
};

export default function SubTask() {
  const { task, auth_user_id } = usePage().props as unknown as {
    task: TaskType;
    auth_user_id: number;
  };

  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File | null }>({});

  type FormData = {
    title: string;
    description: string;
    task_id: number;
    due_date?: string;
  };

  const { data, setData, post, processing, reset, errors } = useForm<FormData>({
    title: "",
    description: "",
    task_id: task.id,
  });

  const handleCreateSubtask = () => {
    post("/sub-task", {
      onSuccess: () => reset(),
    });
  };

  const handleTurnIn = (subtaskId: number) => {
    const file = selectedFiles[subtaskId] ?? null;

    const formData = new FormData();
    if (file) formData.append("file", file);

    router.post(`/sub-task/${subtaskId}/turn-in`, formData, {
      onSuccess: () => router.reload(),
    });
  };

  return (
    <AppLayout>
      <Head title={task.subject} />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Task Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{task.subject}</h1>
            <p className="text-gray-600">{task.class_name}</p>
          </div>

          {/* Create Subtask Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Subtask</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Subtask</DialogTitle>
                <DialogDescription>
                  Add a new subtask under this task.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Title"
                  value={data.title}
                  onChange={(e) => setData("title", e.target.value)}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}

                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description (optional)"
                  value={data.description ?? ""}
                  onChange={(e) => setData("description", e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <Input
                  type="datetime-local"
                  value={data.due_date ?? ""}
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                {errors.due_date && (
                  <p className="text-red-500 text-sm">{errors.due_date}</p>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleCreateSubtask} disabled={processing}>
                  {processing ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Subtasks List */}
        <div className="space-y-4">
          {task.subtasks.length === 0 && (
            <p className="text-center text-gray-500">No subtasks yet.</p>
          )}

          {task.subtasks.map((sub, index) => {
            const currentUserData = sub.users.find((user) => user.id === auth_user_id);
            const done = currentUserData?.pivot?.status === 'submitted';
            const dueDate = sub.due_date ? new Date(sub.due_date + 'Z') : null;
            const missing = currentUserData?.pivot?.status === 'missing';
            const previous = task.subtasks[index - 1];
            const locked =
              previous &&
              !previous.users.some((user) => user.id === auth_user_id);

            return (
              <Card
                key={sub.id}
                className={`${
                  done ? 'bg-green-50' : missing ? 'bg-red-50' : locked ? 'bg-zinc-300' :'bg-blue-50'
                } ${locked ? 'opacity-50' : ''}`}
              >
                <CardHeader>
                  <div className="flex justify-between">
                  <CardTitle className="text-lg flex justify-between">
                    <div>
                      {sub.title}
                      
                    </div>
                  </CardTitle>
                  {!locked && !done && !missing ? (
                  <CardContent className="p-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">Add work</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Submit Work</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2 py-2">
                          <Input
                            type="file"
                            onChange={(e) =>
                              setSelectedFiles({
                                ...selectedFiles,
                                [sub.id]: e.target.files?.[0] ?? null,
                              })
                            }
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={() => handleTurnIn(sub.id)}
                            size="sm"
                          >
                            Turn in
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                  )
                : 
                <div>
                    {done && <p className="text-green-500">Turned In</p>}
                    {locked && <p className="text-gray-500">Locked</p>}
                    {missing && <p className="text-red-600">Missing</p>}
                </div>
                }
                </div>
                {sub.description && 
                  <CardDescription>{sub.description}</CardDescription>
                }
                {currentUserData?.pivot?.file && (
                  <CardDescription>
                    File: <a href={`/storage/${currentUserData.pivot.file}`} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="outline">View</Button></a>
                  </CardDescription>
                )}

                {currentUserData?.pivot?.turned_in_at && (
                  <CardDescription>
                    Submitted at: {new Date(currentUserData.pivot.turned_in_at).toLocaleString()}
                  </CardDescription>
                )}
                
                
                  <CardDescription>
                    Due: {sub.due_date ? new Date(sub.due_date).toLocaleString() : "No due date"}
                </CardDescription>
                </CardHeader>

                
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
