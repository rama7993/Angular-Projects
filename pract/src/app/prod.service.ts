import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdService {

  constructor(private http:HttpClient) { }
  getProduct(){
    return this.http.get("assets/products.json")
  }
  cart:any=[]

  increment(p:any){
    p.qty+=1
  }
  decrement(p:any){
    if(p.qty>0){
      p.qty-=1
    }
  }
}
