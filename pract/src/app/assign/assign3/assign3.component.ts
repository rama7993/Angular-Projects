import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign3',
  templateUrl: './assign3.component.html',
  styleUrls: ['./assign3.component.css']
})
export class Assign3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  show:boolean=true
  log:number[]=[]
  ontoggle(){
    this.show = !this.show
    this.log.push(this.log.length+1)
  }
}
