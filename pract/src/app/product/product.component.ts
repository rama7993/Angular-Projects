import { Component, OnInit } from '@angular/core';
import { ProdService } from '../prod.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private ps: ProdService) { }
  arr: any = [] = []
  ngOnInit(): void {
    this.ps.getProduct().subscribe(data => {
      this.arr = data
    })

  }

  sameId(id: any): Boolean {
    for (let x of this.ps.cart) {
      if (x.id === id) return true
    }
    return false
  }

  addToCart(p: any) {



    if (this.sameId(p.id)) {
      p.qty += 1
      console.log(this.ps.cart)
    }
    else {
      p.qty += 1
      this.ps.cart.push(p)
    }

    window.alert('This product was added to cart')
  }

  onShare() {
    window.alert('This product has Shared')
  }

}
