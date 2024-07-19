import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode:boolean=true

  constructor(private as:AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode
  }
  onSubmit(form:NgForm){
   if(!form.valid) return
   const email=form.value.email
   const password=form.value.password
   if(this.isLoginMode){}
   else{
    this.as.signUp(email,password).subscribe(
      respData=>{
        console.log(respData)
      },
      err=>{
        console.log(err)
      }
     )
   }
   form.reset()
  }
}
