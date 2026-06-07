import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
  providers:[UserService]
})
export class ActiveUsersComponent implements OnInit {

  users!:string[]
  constructor(private us:UserService) { }

  ngOnInit(): void {
    this.users=this.us.activeUsers
  }
  onSetToInactive(id:number){
    this.us.setToInactive(id)
  }
}
