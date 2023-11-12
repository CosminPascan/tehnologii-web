const {existsSync, readFileSync, writeFileSync} = require('fs');
module.exports = function(path) {
    const tasks = existsSync(path)
        ? JSON.parse(readFileSync(path)) : {};
    return {
        getTasksByStatus() {
            return tasks;
        },
        changeTaskStatus(task, oldStatus, newStatus) {
            if (tasks[oldStatus] instanceof Array
                && tasks[newStatus] instanceof Array) {
                let index = tasks[oldStatus].findIndex(t => t === task);
                if (index) {
                    tasks[oldStatus].splice(index, 1);
                    tasks[newStatus].push(task);
                    writeFileSync(path, JSON.stringify(tasks));
                    return true;
                }
            }
            return false;
        }
    };
};