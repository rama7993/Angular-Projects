export class CounterService{
    activeToInactiveCnt=0
    inactiveToActiveCnt=0
    incrementActiveToInactive(){
      this.activeToInactiveCnt++
      console.log("Active to Inactive :" ,this.activeToInactiveCnt)
    }
    incrementInactiveToActive(){
        this.inactiveToActiveCnt++
        console.log("Inactive to Active :" ,this.inactiveToActiveCnt)
      }

}