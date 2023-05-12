class Task {
  title: string;
  description: string;
  status?: string;

  constructor(taskTitle: string, taskDescription: string, taskStatus: string) {
    this.title = taskTitle;
    this.description = taskDescription;
    this.status = taskStatus;
  }
}

export default Task;
