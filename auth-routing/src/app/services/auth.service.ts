import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private router:Router){}
  user:string=''
  login(user: string, password: string): boolean {
    this.user=user
    if (user === 'Rama'||'Admin' && password === 'password') {
      localStorage.setItem('username', user);
      return true;
    }

    return false;
  }

  logout(): any {
    localStorage.removeItem('username');
    //this.router.navigateByUrl('home')
    this.router.navigate(['home'])
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  isAdmin():Boolean{
     if(this.user==="Admin"){
      return true
     }
     return false
  }
}
