import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'entities/Product';
import { Observable } from 'rxjs';
import { Promise } from 'q';



@Injectable({
    providedIn: 'root'
})

export class dataService {

    restapi = 'https://deploytest-server.herokuapp.com';
    singleProdApi = 'https://deploytest-server.herokuapp.com/add/?id=';
    products: Product[];

    constructor(private http: HttpClient) { this.getProductsData().subscribe(data => { this.products = data }); }

    public getProductsData() {
        return this.http.get<Product[]>(this.restapi);
    }


    public getSingleProd(id) {
        return this.http.get<Product>(this.singleProdApi + id);
    }


    findProduct(id: number): Product {

        let temp: Product
        /*for (const product of this.products) {
            if (this.products[i].id == id) {
                temp = this.products[i];
                break;
            }
        }
        return temp; */

        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                temp = this.products[i];
                break;
            }
        }
        return temp;
    }
}
