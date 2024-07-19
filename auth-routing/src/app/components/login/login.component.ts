import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string
  user!:string
  
  constructor(private authService: AuthService,private router:Router) {
    this.message = '';
    this.user=this.authService.getUser()
  }


  ngOnInit(): void {
   
  }

  login(username: string, password: string): void{
    this.message = '';
   
    if (!this.authService.login(username, password)) {
      this.message = 'Incorrect credentials.';
      setTimeout(() => {
        this.message = '';
      }, 2500);
    }
    else{
      this.user=this.authService.getUser()
    }

  }

  logout(): void {
    this.authService.logout();
    //this.router.navigate(['home'])
  }


}
