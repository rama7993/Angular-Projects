import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable({providedIn:'root'})

export class UserService{
    activeUsers:string[] = ['Max', 'Anna'];
    inactiveUsers:string[]= ['Chris', 'Manu']; 
    constructor(private cs:CounterService){

    }
   setToActive(id:number){
     this.activeUsers.push(this.inactiveUsers[id])
     this.inactiveUsers.splice(id,1)
    
     this.cs.incrementInactiveToActive()
   }
   setToInactive(id:number){
    this.inactiveUsers.push(this.activeUsers[id])
    this.activeUsers.splice(id,1)
    this.cs.incrementActiveToInactive()
   }

}