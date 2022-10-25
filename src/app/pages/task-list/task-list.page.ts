import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { DialogService } from 'src/app/services/dialog.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  taskList: Task[] = [];
  id: number = 0;
  currentTask: Task;
  myTask: Task = new Task();

  constructor(private taskService: TaskService, private dialogService: DialogService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(task => {
      this.taskList = task;
      console.log(this.taskList)
    });
  }
  updateTask(index) {
    //  //The activatedRoute method does not work.  I only get null or undefined when attempting to "id or taskId"
    //   const routeID = this.activatedRoute.snapshot.paramMap.get("taskId") ?? "";
    //   this.id = parseInt(routeID);

    //I'm passing the index from the template to get the current taskID.
    this.id = this.taskList[index].taskId;
    console.log(this.id)

    //This will get the task from the backend database based on the current taskId (Method from TaskService).
    this.taskService.getTaskByID(this.id).subscribe(foundTask => {
      this.currentTask = foundTask;

      //This will update the task view on the template.
      if (this.currentTask.completed == false) {
        this.currentTask.completed = true;
      }
      else {
        this.currentTask.completed = false;
      }
      //This will update the backend database based on the current taskId (Method from TaskService).
      this.taskService.editTaskByID(this.id, this.currentTask).subscribe(response => {
        console.log(response);
      })
    })
  }
  //This will prompt the user to enter a new task, and subsequently update the backend database and template.
  newTask() {
    this.dialogService.showPrompt('New Task', 'Enter a new task').subscribe(response => {
      if (response) {
        console.log('New Task: ' + response);
        this.myTask.title = response;
        this.taskService.createTask(this.myTask).subscribe(response => {
          console.log(response);
          this.loadTasks();
        })
      }

    });
  }
  //This will delete the task in the database and refresh the template.
  deleteTask(index){
    this.id = this.taskList[index].taskId;
    console.log(this.id)
    this.taskService.deleteTaskByID(this.id).subscribe(response => {
        console.log(response);
        this.loadTasks();
    });
}
}
