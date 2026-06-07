import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assign6',
  templateUrl: './assign6.component.html',
  styleUrls: ['./assign6.component.css']
})
export class Assign6Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild('signupForm') sgnform !: NgForm
  subscriptions = ["Basic", "Advanced", "Pro"]
  selectedsub="Advanced"
  onSubmit() {
   console.log(this.sgnform.value)
  }
}
