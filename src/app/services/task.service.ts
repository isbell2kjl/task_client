import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseURL: string = "https://localhost:7058/task";

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseURL);
  }

  createTask(newTask: Task) {
    return this.http.post(this.baseURL, newTask);
  }

  getTaskByID(id: number): Observable<Task> {
    return this.http.get<Task>(this.baseURL + "/" + id);
  }

  editTaskByID(id: number, edittedTask: Task): Observable<Task> {
    return this.http.put<Task>(this.baseURL + "/" + id, edittedTask);
  }

  deleteTaskByID(id: number): Observable<any> {
    return this.http.delete<any>(this.baseURL + "/" + id)
  }
}
