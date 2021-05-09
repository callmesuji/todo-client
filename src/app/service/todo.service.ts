import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../shared/model/todo.model';
import { AuthService } from '../shared/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'https://todo-ser-app.herokuapp.com/todo/api/v1/task';
  
  constructor(private http:HttpClient,private authservice:AuthService) { }

  getTodos():Observable<Todo[]>{
     
      
      return this.http.get<Todo[]>(this.baseUrl);
  }
  getArchivedTodos():Observable<Todo[]>{
    let url = `${this.baseUrl}/archive`
    return this.http.get<Todo[]>(url)

  }

  deleteTodo(todo:Todo){
    let url = `${this.baseUrl}/${todo.id}`
    return this.http.delete(url);
  }

  addNewTodo(todo : Todo):Observable<Todo[]>{
   return this.http.post<Todo[]>(this.baseUrl,todo)

  }

  updateTodo(todo :Todo ):Observable<Todo[]>{ 
    return this.http.put<Todo[]>(this.baseUrl,todo)
  }

}
