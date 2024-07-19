import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product!:Product
  
  constructor(private productService: ProductService, 
              private route:ActivatedRoute ){
  }


  ngOnInit() {

      
      let id=this.route.snapshot.params['id'];

      this.productService.getProduct(id)
          .subscribe((data:any) => {
              this.product=data;
          })
  }

}
