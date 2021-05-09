import { error, stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin = true;
  message = "Switch to Register";
  userForm: FormGroup;
  successMessage: string = "";
  errorMessage: string = "";

  constructor(private fb : FormBuilder,private router : Router,private authservice : AuthService) { 
    this.userForm = this.fb.group({
      username: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  onChange() {
    this.isLogin = !this.isLogin;
    if (!this.isLogin) {
      this.message = "Swich to Login";
    } else {
      this.message = "Switch to Register"
    }
  }
  onSubmit(){
    
    let user: User;
    user = this.userForm.value;
    if (this.isLogin) {
      this.authservice.login(user).subscribe(
        res => {
          let token:string = res["jwt"] as string;
          this.router.navigate(['/home']);
          this.authservice.addTokenAndUsername(token,user.username);
        }, _error => {
          this.errorMessage = "Invalid username or password";
          setTimeout(() => {
            this.errorMessage = "";
          }, 3000);
        }
      )
    } else {
      this.authservice.register(user).subscribe(
        res => {
          if(res){{
            this.userForm.reset();
            this.router.navigate(['/home']);
          }}
        }, 
        _error => {
          this.userForm.reset();
          alert("username already exists")
          // this.errorMessage = "username already exists"
          setTimeout(() => {
            this.errorMessage = "";
          }, 3000);
        })
    }
  }
}
