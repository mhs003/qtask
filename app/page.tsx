"use client";

import { Badge } from "@/components/ui/badge";
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
import { cn, randomColor, uniq_key } from "@/lib/utils";
import { CheckCircle, Pencil, Shell, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
    // States
    const [formDatas, setFormDatas] = useState({
        task: "",
        priority: "",
    });
    const [editFormData, setEditFormData] = useState({
        key: "",
        task: "",
        priority: "",
    });

    const [dialogOpened, setDialogOpened] = useState(false);
    const [editDialogOpened, setEditDialogOpened] = useState(false);

    const [tasks, setTasks] = useState<Array<TaskData>>([]);
    const [refreshTasks, setRefreshTasks] = useState(0);

    // Form actions
    const saveTask = (): void => {
        Storage.addTask({
            key: uniq_key(),
            task: formDatas.task,
            status: 0,
            priority: formDatas.priority == "" ? "low" : formDatas.priority,
            deleted: false,
            // color: randomColor(),
        });
        setDialogOpened(false);
        setRefreshTasks((o) => o + 1);
    };

    const editTask = (): void => {
        Storage.updateTask(editFormData.key, {
            key: editFormData.key,
            task: editFormData.task,
            status: -1,
            priority: editFormData.priority,
            deleted: false,
            // color: "__old__",
        });
        setEditDialogOpened(false);
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
                // color: "__old__",
            });
            setRefreshTasks((o) => o + 1);
        }
    };

    const deleteTask = (key: string): void => {
        const task = Storage.getTask(key);
        if (task) {
            Storage.deleteTask(key);
            setRefreshTasks((o) => o + 1);
        }
    };

    useEffect(() => {
        setTasks(() => {
            return Storage?.getTasks()?.reverse() ?? [null];
        });
    }, [refreshTasks]);

    return (
        <div className="flex flex-col justify-start items-center p-4 px-8 lg:pr-0 gap-2 max-h-[calc(100dvh-105px)] overflow-y-auto">
            {/* Edit Task Dialog */}
            <Dialog open={editDialogOpened} onOpenChange={setEditDialogOpened}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit task</DialogTitle>
                    </DialogHeader>
                    <form action={editTask} method="post">
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
                                    value={editFormData.task}
                                    onChange={(e) => {
                                        setEditFormData((old) => {
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
                                    value={editFormData.priority}
                                    onValueChange={(data: string) => {
                                        setEditFormData((old) => {
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
                                            <SelectItem
                                                value="medium"
                                                aria-selected
                                            >
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
            {/* /Edit Task Dialog */}
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
                                                <SelectItem
                                                    value="medium"
                                                    aria-selected
                                                >
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
            <div className="mt-5 w-full">
                <Tabs
                    defaultValue="incomplete"
                    className="w-full flex flex-col gap-3 justify-center items-center"
                >
                    <div className="w-full flex flex-col-reverse lg:flex-row justify-between items-center gap-3 lg:gap-5">
                        <TabsList>
                            <TabsTrigger value="incomplete">
                                Incomplete
                            </TabsTrigger>
                            <TabsTrigger value="completed">
                                Completed
                            </TabsTrigger>
                        </TabsList>
                        <div className="flex text-sm">
                            <div className="pr-3 border-r border-border/60 mr-3">
                                <b>Total tasks:</b>{" "}
                                {
                                    tasks?.filter(
                                        (task) => task?.deleted == false
                                    ).length
                                }
                            </div>
                            <div>
                                <b>Completed tasks:</b>{" "}
                                {
                                    tasks?.filter(
                                        (task) =>
                                            task?.status == 1 &&
                                            task?.deleted == false
                                    ).length
                                }
                            </div>
                        </div>
                    </div>
                    <TabsContent value="incomplete" className="w-full">
                        <div
                            className={cn(
                                "w-full h-28 flex justify-center items-center gap-2",
                                tasks?.length > 0 ? "hidden" : ""
                            )}
                        >
                            <Shell className="animate-spin-reverse" />
                            Loading...
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                            {tasks && tasks[0] !== null
                                ? tasks.map((task) => {
                                      if (task.deleted || task.status == 1) {
                                          return;
                                      }
                                      return (
                                          <div
                                              key={task.key}
                                              className="grid grid-cols-[1fr_auto] gap-5 p-4 rounded-lg shadow-lg transition-shadow hover:shadow-xl border border-border/60"
                                          >
                                              <div className="flex flex-col gap-3">
                                                  <h3 className="font-semibold text-foreground break-all">
                                                      {task.task}
                                                  </h3>
                                                  <div className="flex flex-col gap-1">
                                                      <p className="text-sm text-muted-foreground">
                                                          <b>Priority:</b>{" "}
                                                          <Badge
                                                              className={cn(
                                                                  "capitalize",
                                                                  {
                                                                      "bg-blue-500":
                                                                          task.priority ==
                                                                          "low",
                                                                  },
                                                                  {
                                                                      "bg-green-500":
                                                                          task.priority ==
                                                                          "medium",
                                                                  },
                                                                  {
                                                                      "bg-red-500":
                                                                          task.priority ==
                                                                          "high",
                                                                  }
                                                              )}
                                                          >
                                                              {task.priority}
                                                          </Badge>
                                                      </p>
                                                      <p className="text-sm text-muted-foreground">
                                                          <b>Status:</b>{" "}
                                                          {task.status == 0
                                                              ? "Incomplete"
                                                              : "Completed"}
                                                      </p>
                                                  </div>
                                              </div>
                                              <div className="flex flex-col gap-2 justify-end">
                                                  <Button
                                                      variant="outline"
                                                      size="icon"
                                                      className="p-[6px]"
                                                      onClick={() => {
                                                          markAsComplete(
                                                              task.key
                                                          );
                                                      }}
                                                      title="Mark as complete"
                                                  >
                                                      <CheckCircle />
                                                  </Button>
                                                  <Button
                                                      variant="outline"
                                                      size="icon"
                                                      className="p-[6px]"
                                                      onClick={() => {
                                                          setEditFormData(
                                                              () => {
                                                                  return {
                                                                      key: task.key,
                                                                      task: task.task,
                                                                      priority:
                                                                          task.priority,
                                                                  };
                                                              }
                                                          );
                                                          setEditDialogOpened(
                                                              true
                                                          );
                                                      }}
                                                      title="Edit task"
                                                  >
                                                      <Pencil />
                                                  </Button>
                                                  <Button
                                                      variant="destructive"
                                                      size="icon"
                                                      onClick={() => {
                                                          deleteTask(task.key);
                                                      }}
                                                      title="Delete task"
                                                  >
                                                      <Trash2 />
                                                  </Button>
                                              </div>
                                          </div>
                                      );
                                  })
                                : ""}
                        </div>
                    </TabsContent>
                    <TabsContent value="completed" className="w-full">
                        <div
                            className={cn(
                                "w-full h-28 flex justify-center items-center gap-2",
                                tasks?.length > 0 ? "hidden" : ""
                            )}
                        >
                            <Shell className="animate-spin-reverse" />
                            Loading...
                        </div>
                        {/*  */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                            {tasks && tasks[0] !== null
                                ? tasks.map((task) => {
                                      if (task.deleted || task.status == 0) {
                                          return;
                                      }
                                      return (
                                          <div
                                              key={task.key}
                                              className="grid grid-cols-[1fr_auto] gap-5 p-4 rounded-lg shadow-lg transition-shadow hover:shadow-xl border border-border/60"
                                          >
                                              <div className="flex flex-col gap-3">
                                                  <h3 className="font-semibold text-foreground break-all">
                                                      {task.task}
                                                  </h3>
                                                  <div className="flex flex-col gap-1">
                                                      <p className="text-sm text-muted-foreground">
                                                          <b>Priority:</b>{" "}
                                                          <Badge
                                                              className={cn(
                                                                  "capitalize",
                                                                  {
                                                                      "bg-blue-500":
                                                                          task.priority ==
                                                                          "low",
                                                                  },
                                                                  {
                                                                      "bg-green-500":
                                                                          task.priority ==
                                                                          "medium",
                                                                  },
                                                                  {
                                                                      "bg-red-500":
                                                                          task.priority ==
                                                                          "high",
                                                                  }
                                                              )}
                                                          >
                                                              {task.priority}
                                                          </Badge>
                                                      </p>
                                                      <p className="text-sm text-muted-foreground">
                                                          <b>Status:</b>{" "}
                                                          {task.status == 0
                                                              ? "Incomplete"
                                                              : "Completed"}
                                                      </p>
                                                  </div>
                                              </div>
                                              <div className="flex flex-col gap-2 justify-end">
                                                  <Button
                                                      variant="destructive"
                                                      size="icon"
                                                      onClick={() => {
                                                          deleteTask(task.key);
                                                      }}
                                                      title="Delete task"
                                                  >
                                                      <Trash2 />
                                                  </Button>
                                              </div>
                                          </div>
                                      );
                                  })
                                : ""}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
