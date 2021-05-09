import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  username:string="";
  constructor(private authservice:AuthService,private router:Router) {
        this.username = authservice.getUsername() as string;

       authservice.usernameSubject.subscribe(res=>{
            this.username = res;
        })
   }

  ngOnInit(): void {
  }
  logout(){
      this.authservice.logout();
      this.router.navigate(['/login']);
  }

}
