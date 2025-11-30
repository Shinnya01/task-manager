import AppLayout from "@/layouts/app-layout";
import { SharedData, Task, User } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function UserManagement({tasks}: {tasks: Task[]}){
    const { auth } = usePage<SharedData>().props;
    const handleShow = (id: number) => router.visit(`task/${id}`);

    const { data, setData, post, processing, reset, errors } = useForm({
        subject: "",
        class_name: "",
    });

    const [editingTask, setEditingTask] = React.useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = React.useState<Task | null>(null);

    const handleSubmit = () => {
        post('task', {
            onSuccess: () => {
                alert('Create Success')
                reset()
            },
        });
    };

    const handleEditTask = () => {
        if (!editingTask) return;

        router.put(`/task/${editingTask.id}`, {
            subject: editingTask.subject,
            class_name: editingTask.class_name,
        }, {
            onSuccess: () => {
                setEditingTask(null);
                router.reload();
            }
        });
    };

    const handleDeleteTask = () => {
        if (!deletingTask) return;

        router.delete(`/task/${deletingTask.id}`, {
            onSuccess: () => {
                setDeletingTask(null);
                router.reload();
            }
        });
    };
    
    return (
        <AppLayout>
            <Head title="User Management"/>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* {auth.user.role !== 'user' && ( */}
                <div className="flex justify-end">
                    {auth.user.role !== 'user' && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Create Task</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-sm">
                                <DialogHeader>
                                <DialogTitle>Create Task</DialogTitle>
                                <DialogDescription>
                                    Add a new task with a subject and class.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-2">
                                <Input
                                    placeholder="Subject"
                                    value={data.subject}
                                    onChange={(e) => setData("subject", e.target.value)}
                                />
                                
                                {errors.subject && <p className="text-red-600 text-sm">{errors.subject}</p>}

                                {/* <Input
                                    placeholder="Class"
                                    value={data.class_name}
                                    onChange={(e) => setData("class_name", e.target.value)}
                                /> */}
                                <Select
                                value={data.class_name} 
                                onValueChange={(value) => setData("class_name", value)}
                                >
                                    <SelectTrigger >
                                        <SelectValue placeholder="Class"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IT 3A">IT 3A</SelectItem>
                                        <SelectItem value="IT 3B">IT 3B</SelectItem>
                                        <SelectItem value="IT 3C">IT 3C</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.class_name && <p className="text-red-600 text-sm">{errors.class_name}</p>}

                                <Button className="w-full" onClick={handleSubmit} disabled={processing}>
                                    {processing ? "Saving..." : "Save Task"}
                                </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}

                </div>
                {/* ads)} */}
                <div className="flex-1 space-y-4">
                    {tasks.length <= 0 && (
                        <p className="text-center text-gray-500">No Subject yet.</p>
                    )}
                    {tasks.map((task) => (
                        <Card key={task.id} className="hover:shadow-md transition gap-4 relative" onClick={() => handleShow(task.id)}>
                            <CardHeader>
                                <div className="flex justify-between items-start w-full">
                                    <div>
                                        <CardTitle>{task.subject}</CardTitle>
                                        <CardDescription>{task.class_name}</CardDescription>
                                    </div>
                                    {auth.user.role !== 'user' && (
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setEditingTask(task); }}>Edit</Button>
                                            <Button size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); setDeletingTask(task); }}>Delete</Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Remaining Tasks: { (task as any).sub_tasks_count ?? ((task as any).subTasks ? (task as any).subTasks.length : 0) }</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            
            </div>
            {/* Edit Task Dialog */}
            <Dialog open={!!editingTask} onOpenChange={(open) => { if (!open) setEditingTask(null); }}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    {editingTask && (
                        <div className="space-y-4 py-2">
                            <Input value={editingTask.subject} onChange={(e) => setEditingTask({ ...editingTask, subject: e.target.value })} />
                            <Select value={editingTask.class_name} onValueChange={(v) => setEditingTask({ ...editingTask, class_name: v })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="IT 3A">IT 3A</SelectItem>
                                    <SelectItem value="IT 3B">IT 3B</SelectItem>
                                    <SelectItem value="IT 3C">IT 3C</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex gap-2">
                                <Button className="flex-1" onClick={handleEditTask}>Save</Button>
                                <Button variant="outline" className="flex-1" onClick={() => setEditingTask(null)}>Cancel</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Task Dialog */}
            <Dialog open={!!deletingTask} onOpenChange={(open) => { if (!open) setDeletingTask(null); }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Task</DialogTitle>
                        <DialogDescription>Are you sure you want to delete "{deletingTask?.subject}"?</DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2 mt-4">
                        <Button variant="destructive" onClick={handleDeleteTask}>Delete</Button>
                        <Button variant="outline" onClick={() => setDeletingTask(null)}>Cancel</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}