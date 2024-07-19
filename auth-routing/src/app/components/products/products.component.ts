import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  
  products:Product[] | undefined;
  constructor(private productService: ProductService){
  }

  ngOnInit() {

     this.productService.getProducts()
       .subscribe( (data:any) => {
         this.products=data;
       })
  }
}
