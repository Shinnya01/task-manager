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

    const handleShow = (id: number) => {
        // router.visit('sub-task/1');
        router.visit(`task/${id}`);
    }

    const { data, setData, post, processing, reset, errors } = useForm({
        subject: "",
        class_name: "",
    });

    const handleSubmit = () => {
        post('task', {
            onSuccess: () => {
                alert('Create Success')
                reset()
            },
        });
    };
    
    return (
        <AppLayout>
            <Head title="User Management"/>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* {auth.user.role !== 'user' && ( */}
                <div className="flex justify-between">
                    <InputGroup className="max-w-lg">
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                        <Search />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
                    </InputGroup>
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

                </div>
                {/* ads)} */}
                <div className="flex-1 space-y-4">
                    {tasks.map((task) => (
                        <Card className="hover:shadow-md transition gap-4" onClick={() => handleShow(task.id)}>
                            <CardHeader>
                                <CardTitle>{task.subject}</CardTitle>
                                <CardDescription>{task.class_name}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Remaining Task: 4</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            
            </div>
        </AppLayout>
    );
}