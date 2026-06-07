import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product!:Product
  id!:number
  constructor(private productService: ProductService,  private route:ActivatedRoute ){
    //this.id=this.route.snapshot.params['id'];
    route.params.subscribe( (params) => { this.id = params['id']; });
  }
  


  ngOnInit() {

  

  this.productService.getProduct(this.id)
      .subscribe((data:any) => {
          this.product=data;
      })
  }

}
