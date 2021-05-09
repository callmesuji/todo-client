import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {TodoService} from '../service/todo.service';
import {Todo} from '../shared/model/todo.model';
import {formatDate} from '@angular/common';
 

@Component({selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit {

    btntxt : String = "create";
    showArchives = false;
    data = "";
    buttonName = "";
    todos : Todo[] = [];
    archives : Todo[] = [];
    userReg : FormGroup = this.fb.group({
        id: [''],
        taskTitle: ['',[Validators.required]],
        description: ['', Validators.required],
        targetDate: ['', Validators.required]})
    constructor(private todoservice : TodoService, private fb : FormBuilder) {

    }

    ngOnInit(): void {
        this.showTodos();
        this.getArchivedTodos();
    }


    toggleArchives() {
        this.showArchives = !this.showArchives;
        this.getArchivedTodos();
    }

    showTodos() {
        this.todoservice.getTodos().subscribe(res => {
            this.todos = res;
        })
        this.getArchivedTodos();
    }
    getArchivedTodos() {
        this.todoservice.getArchivedTodos().subscribe(res => {
            this.archives = res;
        })
    }

    createUser() {

        console.log(this.userReg.value);
        if (this.btntxt == "create") {
            console.log(this.userReg.value);

            this.todoservice.addNewTodo(this.userReg.value).subscribe(res => {
                this.todos = res;
                this.userReg.reset();
                this.showTodos();
            })


        } else { // UPDATION

            if (this.btntxt == "update") {
                this.userReg.value["id"] = localStorage.getItem("id")

                this.todoservice.updateTodo(this.userReg.value).subscribe(res => { 
                    this.userReg.reset();
                    this.btntxt = "create";
                     
                    alert("Contact updated successfully")
                    this.showTodos();

                })
            }

        }


    }

    onDelete(todo : Todo) {

        console.log(todo);
        this.todoservice.deleteTodo(todo).subscribe(res => {
            this.showTodos();
        })
    }

    editUser(todo : Todo) {
        localStorage.id = todo.id; 
        this.btntxt = "update";
        this.userReg.patchValue(todo)
    }


    resetForm() {
        this.userReg.reset();
        this.btntxt = "create";
    }

}
