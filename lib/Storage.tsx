import { isArray, isObject } from "./utils";

interface TaskData {
    key: string;
    task: string;
    status: number; // 0: Incomplete | 1: Completed
    priority: string;
    deleted: boolean;
    // color: string;
}

const Storage = {
    __STORAGE_NAME: "__tasks__",

    /**
     * Sets data in local storage with the provided key and value, optionally overriding existing data.
     *
     * @param {string} key - The key for the data in local storage
     * @param {string | object | boolean | number | Array<any>} value - The value to be stored
     * @param {boolean} override - Flag to indicate if existing data should be overridden (default is false)
     */
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

    /**
     * Adds a task to the local storage if running in a browser environment.
     *
     * @param {TaskData} data - the task data to be added
     * @return {void}
     */
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

    /**
     * Retrieves an array of task data.
     *
     * @return {Array<TaskData>} an array of task data
     */
    getTasks: (): Array<TaskData> => {
        if (typeof window !== "undefined") {
            return JSON.parse(
                String(localStorage.getItem(Storage.__STORAGE_NAME))
            );
        } else {
            return [];
        }
    },

    /**
     * Retrieves a task data by its key from the storage.
     *
     * @param {string} key - the key of the task to retrieve
     * @return {TaskData | void} the task data corresponding to the key, or void if window is undefined
     */
    getTask: (key: string): TaskData | void => {
        if (typeof window !== "undefined") {
            const tasks = Storage.getTasks();
            const task = tasks.filter((data) => data.key == key)[0];
            return task;
        }
    },

    /**
     * Updates a task in the storage with the specified key and update data.
     *
     * @param {string} key - The key of the task to update
     * @param {TaskData} updateData - The updated task data
     */
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
                          //   color:
                          //       updateData.color == "__old__"
                          //           ? data.color
                          //           : updateData.color,
                      }
                    : data
            );
            localStorage.setItem(
                Storage.__STORAGE_NAME,
                JSON.stringify(newTasks)
            );
        }
    },

    /**
     * Deletes a task from storage.
     *
     * @param {string} key - the key of the task to be deleted
     * @return {void}
     */
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
                          //   color: data.color,
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

export type { TaskData };

export default Storage;
