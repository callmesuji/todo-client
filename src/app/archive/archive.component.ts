import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Todo } from '../shared/model/todo.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor(private todoservice : TodoService) { }

  archives : Todo[] = [];
  

  ngOnInit(): void {
    this.getArchivedTodos();
  }

  getArchivedTodos() { 
       this.todoservice.getArchivedTodos().subscribe(res => {
        this.archives = res;
    })
}

}
