class Task {
  id: string;
  title: string;
  description: string;
  status?: string;

  constructor(taskTitle: string, taskDescription: string, taskStatus: string, taskId: string) {
    this.title = taskTitle;
    this.description = taskDescription;
    this.status = taskStatus;
    this.id = taskId;
  }
}

export default Task;
