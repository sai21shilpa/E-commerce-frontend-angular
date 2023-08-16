import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './_service/product.service';


@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product>{

    const id=route.paramMap.get("productId");
    let prodid:number=0;
    
    if (typeof id === 'string') {
        prodid=parseInt(id);
       console.log(typeof prodid)
      return this.productService.getProductDetailsById(prodid)
              .pipe( map(p => this.imageProcessingService.createImages(p)));
    }else{
      return of(this.getProductDetails());
    }  
  }

  getProductDetails(){
    return {
    productId: 0,
    productName: "",
    productDescription: "",
    vendorDescription:"",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages:[],
    };
  }
}
