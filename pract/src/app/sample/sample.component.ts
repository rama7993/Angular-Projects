import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  colour:string="green"
  choice:Boolean=false
  names:String[]=new Array("rama","shyam","singh","roy","koti")
  amount:number=300
  choosen:string=""

  setcolor(clr:string){
    this.colour=clr
  }
  toggle(){
    this.choice= this.choice ? false:true
  }
  Increment(){
    this.amount+=500
  }
  Decrement(){
    this.amount-=1000
  }
  func(event:any){
   this.choosen=event.target.value
  }

}
