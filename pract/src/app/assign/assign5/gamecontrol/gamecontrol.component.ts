import { Component, OnInit,EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-gamecontrol',
  templateUrl: './gamecontrol.component.html',
  styleUrls: ['./gamecontrol.component.css']
})
export class GamecontrolComponent implements OnInit {
  interval:any=''
  @Output() intervalFired=new EventEmitter<number>()
  last:number=0
  constructor() { }

  ngOnInit(): void {
  }
  Onstart(){
   this.interval=setInterval( ()=> {this.intervalFired.emit(this.last+1);this.last++;},1000)
  }
  Onpause(){
   clearInterval(this.interval)
  }
}
