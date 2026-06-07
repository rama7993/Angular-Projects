import { Component, OnInit  } from '@angular/core';
import { UserService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
})
export class InactiveUsersComponent implements OnInit {
  users!:string[]
  constructor(private us:UserService) { }

  ngOnInit(): void {
    this.users=this.us.inactiveUsers
  }
  onSetToActive(id:number){
    this.us.setToActive(id)
    this.users=this.us.inactiveUsers
    console.log( "Active: ",this.users)
  }
}
