import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_PORTAL } from '../BASE_URL/BASE_URL';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseURL = BASE_URL_PORTAL+'api/product/';
  constructor(private http: HttpClient) { }


  getProductsList() : Observable<any> {
     return this.http.get(this.baseURL,
      {});
  }
  postProductsList(productNew:any): Observable<any> {
    return this.http.post(this.baseURL ,{
      productCode: productNew.productCode,
      productName: productNew.productName,
      productDesc: productNew.productDesc,
    });
  }
  deleteProduct(id:number){
    return this.http.delete(this.baseURL+id)
  }
  getproductbyid(id:number){
    return this.http.get(this.baseURL+id)
  }
  updateProduct(id:number,data:any){
    return this.http.put(this.baseURL+id,{
      productCode: data.productCode,
      productName: data.productName,
      productDesc: data.productDesc,
    })
  }
}
