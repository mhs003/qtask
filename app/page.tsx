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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Storage, { TaskData } from "@/lib/Storage";
import { randomColor, uniq_key } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
    const [formDatas, setFormDatas] = useState({
        task: "",
        priority: "",
    });
    const [dialogOpened, setDialogOpened] = useState(false);

    const [tasks, setTasks] = useState<Array<TaskData>>([]);
    const [refreshTasks, setRefreshTasks] = useState(0);

    const saveTask = (): void => {
        Storage.addTask({
            key: uniq_key(),
            task: formDatas.task,
            status: 0,
            priority: formDatas.priority == "" ? "low" : formDatas.priority,
            deleted: false,
            color: randomColor(),
        });
        setDialogOpened(false);
        setRefreshTasks((o) => o + 1);
    };

    const markAsComplete = (key: string): void => {
        const task = Storage.getTask(key);
        if (task) {
            Storage.updateTask(key, {
                key: key,
                task: "__old__",
                status: 1,
                priority: "__old__",
                deleted: false,
                color: "__old__",
            });
            setRefreshTasks((o) => o + 1);
        }
    };

    useEffect(() => {
        setTasks(() => {
            return Storage.getTasks().reverse();
        });
        console.log("refreshed");
    }, [refreshTasks]);

    return (
        <div className="flex flex-col justify-start items-center p-4 gap-2 max-h-[calc(100dvh-105px)] overflow-y-auto">
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
                                        required
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
                                            aria-required
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
            {/*  */}
            <div className="mt-5 w-full">
                <Tabs
                    defaultValue="incomplete"
                    className="w-full flex flex-col gap-3 justify-center items-center"
                >
                    <TabsList>
                        <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="incomplete" className="w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                            {tasks
                                ? tasks.map((task) => {
                                      if (task.deleted || task.status == 1) {
                                          return;
                                      }
                                      return (
                                          <div
                                              key={task.key}
                                              className="grid grid-cols-[1fr_auto] gap-2 p-4 rounded-md"
                                              style={{
                                                  backgroundColor: task.color,
                                              }}
                                          >
                                              <div className="flex flex-col gap-3">
                                                  <h3 className="text-xl font-semibold text-white break-all">
                                                      {task.task}
                                                  </h3>
                                                  <div className="flex flex-col gap-1">
                                                      <p className="text-sm text-gray-50">
                                                          <b>Priority:</b>{" "}
                                                          {task.priority}
                                                      </p>
                                                      <p className="text-sm text-gray-50">
                                                          <b>Status:</b>{" "}
                                                          {task.status == 0
                                                              ? "Incomplete"
                                                              : "Completed"}
                                                      </p>
                                                  </div>
                                              </div>
                                              <div>
                                                  <Button
                                                      variant="outline"
                                                      onClick={markAsComplete}
                                                  >
                                                      Complete
                                                  </Button>
                                              </div>
                                          </div>
                                      );
                                  })
                                : ""}
                        </div>
                    </TabsContent>
                    <TabsContent value="completed">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
