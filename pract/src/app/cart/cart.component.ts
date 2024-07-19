import { Component,  OnInit } from '@angular/core';
import { ProdService } from '../prod.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:any=[]
  constructor(private ps:ProdService) { 
    this.cart=ps.cart
  }

  ngOnInit(): void {
  }

  increment(p:any){
    this.ps.increment(p)
  }
  decrement(p:any){
    this.ps.decrement(p)
  }
}
