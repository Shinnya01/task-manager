import AppLayout from "@/layouts/app-layout";
import { Task } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function SubTask(){
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
            <Head title="Task"/>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
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

                            <Input
                                placeholder="Class"
                                value={data.class_name}
                                onChange={(e) => setData("class_name", e.target.value)}
                            />
                            {errors.class_name && <p className="text-red-600 text-sm">{errors.class_name}</p>}

                            <Button className="w-full" onClick={handleSubmit} disabled={processing}>
                                {processing ? "Saving..." : "Save Task"}
                            </Button>
                            </div>
                        </DialogContent>
                        </Dialog>

                </div>
                <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                        <Card className="gap-2">
                            <CardHeader>
                                <div className="flex justify-between">
                                    <div className="space-y-2">
                                    <CardTitle>asd</CardTitle>
                                    <CardDescription
                                        className="text-red-600 font-medium">
                                        Missing
                                    </CardDescription>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm">Add Work</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add Work</DialogTitle>
                                            <DialogDescription>
                                                <Input type="file"/>
                                            </DialogDescription>
                                            <DialogFooter className="space-x-2">
                                                <Button variant="ghost">Discard</Button>
                                                <Button>Turn In</Button>
                                            </DialogFooter>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    {/* <p className="text-green-700 text-base">Turned In</p> */}
                                </div>
                                
                                <CardDescription>asd</CardDescription>
                                <CardDescription className="max-w-xs flex gap-2 items-center">
                                    <span className="text-xs">99%</span><Progress value={30}/>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>ads</p>
                                <CardDescription>Due: asd</CardDescription>
                            </CardContent>
                            {/* <Card className="m-4 mb-0">
                                <CardHeader>
                                    <CardTitle>Comments</CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 grid gap-2">
                                    <div className="h-full max-h-26 overflow-y-auto">
                                        <p><span className="font-bold">You:</span> asd</p>
                                        <p>Natoy: Lorem, ipsum dolor.</p>
                                        <p><span className="font-bold">You:</span> asd</p>
                                        <p>Natoy: Lorem, ipsum dolor.</p>
                                        <p><span className="font-bold">You:</span> asd</p>
                                        <p>Natoy: Lorem, ipsum dolor.</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input type="text"/>
                                        <SendHorizonal/>
                                    </div>
                                </CardContent>
                            </Card> */}
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}

                            // <div className="grid grid-cols-[3fr_1fr] gap-4">
                            //     <section>
                            //         <div>
                            //             <CardHeader>
                            //                 <CardTitle>{task.title}</CardTitle>
                            //                 <CardDescription>{task.class}</CardDescription>
                            //                 <CardDescription className="max-w-xs flex gap-2 items-center">
                            //                     <span className="text-xs">99%</span><Progress value={30}/>
                            //                 </CardDescription>
                            //             </CardHeader>
                            //             <CardContent>
                            //                 <p>{task.description}</p>
                            //                 <CardDescription>Due: {task.due_date}</CardDescription>
                            //             </CardContent>
                            //         </div>
                            //         <Separator className="ml-4 my-4"/>
                            //         <Card className="ml-4">
                            //             <CardHeader>
                            //                 <CardTitle>Comments</CardTitle>
                            //             </CardHeader>
                            //             <CardContent className="h-26 overflow-y-auto">
                            //                 <div className="text-xs">
                            //                     <p>You: Lorem, ipsum dolor.</p>
                            //                     <p>Natoy: Lorem, ipsum dolor.</p>
                            //                 </div>
                            //             </CardContent>
                            //         </Card>
                            //     </section>
                            //     <section className="mr-4 space-y-4">
                            //         <Card>
                            //             <CardHeader>
                            //                 <div className="flex justify-between">
                            //                     <p>Your Work</p>
                            //                     <p>Turned in</p>
                            //                 </div>
                                        
                            //                 <Label htmlFor="file">File</Label>
                            //                 <Input id="file" type="file"/>
                            //             </CardHeader>
                            //         </Card>
                            //         <Card className="py-4">
                            //             <CardHeader>
                            //                 <CardTitle>Private Comment</CardTitle>
                            //             </CardHeader>
                            //             <CardContent className="space-y-2">
                            //                 <Textarea className="w-full"/>
                            //                 <div className="flex justify-end">
                            //                     <Button>Submit</Button>
                            //                 </div>
                            //             </CardContent>
                            //         </Card>
                            //     </section>
                            // </div>