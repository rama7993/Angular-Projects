import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign5',
  templateUrl: './assign5.component.html',
  styleUrls: ['./assign5.component.css']
})
export class Assign5Component implements OnInit {

  constructor() { }
  odd:number[]=[]
  even:number[]=[]
  ngOnInit(): void {
  }
 onFire(val:number){
  if(val%2) this.odd.push(val)
  else this.even.push(val)
 }
}
