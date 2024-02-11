import { isArray, isObject } from "./utils";

interface TaskData {
    key: string;
    task: string;
    status: number;
    priority: string;
    deleted: boolean;
}

const Storage = {
    __STORAGE_NAME: "__tasks__",

    setData: (
        key: string,
        value: string | object | boolean | number | Array<any>,
        override: boolean = false
    ) => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem(key) && !override) {
                throw new Error("Key data already exists");
            } else {
                let genValue: string = "";
                if (isArray(value) || isObject(value)) {
                    genValue = JSON.stringify(value);
                } else {
                    genValue = String(value);
                }
                localStorage.setItem(key, genValue);
            }
        }
    },

    addTask: (data: TaskData) => {
        if (typeof window !== "undefined") {
            if (!Storage.getTasks()) {
                localStorage.setItem(
                    Storage.__STORAGE_NAME,
                    JSON.stringify([data])
                );
            } else {
                const oldData: Array<TaskData> = Storage.getTasks();
                oldData.push(data);
                localStorage.setItem(
                    Storage.__STORAGE_NAME,
                    JSON.stringify(oldData)
                );
            }
        }
    },

    getTasks: (): Array<TaskData> => {
        if (typeof window !== "undefined") {
            return JSON.parse(
                String(localStorage.getItem(Storage.__STORAGE_NAME))
            );
        } else {
            return [];
        }
    },

    getTask: (key: string): TaskData | void => {
        if (typeof window !== "undefined") {
            const tasks = Storage.getTasks();
            const task = tasks.filter((data) => data.key == key)[0];
            return task;
        }
    },

    updateTask: (key: string, updateData: TaskData) => {
        if (typeof window !== "undefined") {
            const tasks = Storage.getTasks();
            const newTasks = tasks.map((data) =>
                data.key == key
                    ? {
                          key: data.key,
                          task:
                              updateData.task == "__old__"
                                  ? data.task
                                  : updateData.task,
                          status:
                              updateData.status == -1
                                  ? data.status
                                  : updateData.status,
                          priority:
                              updateData.priority == "__old__"
                                  ? data.priority
                                  : updateData.priority,
                          deleted: updateData.deleted,
                      }
                    : data
            );
            localStorage.setItem(
                Storage.__STORAGE_NAME,
                JSON.stringify(newTasks)
            );
        }
    },

    deleteTask: (key: string) => {
        if (typeof window !== "undefined") {
            const tasks = Storage.getTasks();
            const newTasks = tasks.map((data) =>
                data.key == key
                    ? {
                          key: data.key,
                          task: data.task,
                          status: data.status,
                          priority: data.priority,
                          deleted: true,
                      }
                    : data
            );
            localStorage.setItem(
                Storage.__STORAGE_NAME,
                JSON.stringify(newTasks)
            );
        }
    },
};

export default Storage;
