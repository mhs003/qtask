"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
    const [formDatas, setFormDatas] = useState({
        task: "",
        priority: "",
    });
    const [dialogOpened, setDialogOpened] = useState(false);

    const saveTask = (): void => {
        localStorage.setItem("test", "test value");
    };

    return (
        <div className="hidden lg:flex flex-col justify-start items-center p-4 gap-2">
            <div className="w-full flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">
                    Tasks
                </h2>
                <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
                    <DialogTrigger asChild>
                        {/* <Button>Add task</Button> */}
                        <Button variant="outline">Add task</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add task</DialogTitle>
                            <DialogDescription>
                                Add a new task to your list
                            </DialogDescription>
                        </DialogHeader>
                        <form action={saveTask} method="post">
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="taskDesc"
                                        className="text-right"
                                    >
                                        Task
                                    </Label>
                                    <Textarea
                                        id="taskDesc"
                                        name="task"
                                        placeholder=""
                                        className="col-span-3"
                                        onChange={(e) => {
                                            setFormDatas((old) => {
                                                return {
                                                    ...old,
                                                    task: e.target.value,
                                                };
                                            });
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="taskPriority"
                                        className="text-right"
                                    >
                                        Priority
                                    </Label>
                                    <Select
                                        onValueChange={(data: string) => {
                                            setFormDatas((old) => {
                                                return {
                                                    ...old,
                                                    priority: data,
                                                };
                                            });
                                        }}
                                    >
                                        <SelectTrigger
                                            id="taskPriority"
                                            className="col-span-3"
                                            name="priority"
                                        >
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Priorities
                                                </SelectLabel>
                                                <SelectItem value="low">
                                                    Low
                                                </SelectItem>
                                                <SelectItem value="medium">
                                                    Medium
                                                </SelectItem>
                                                <SelectItem value="high">
                                                    High
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {/* --- */}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
