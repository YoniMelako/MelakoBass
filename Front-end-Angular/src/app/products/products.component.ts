import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from 'services/productService';
import { Product } from 'entities/Product';
import { dataService } from 'services/dataservice';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  constructor(private service: ProductService, private DataService: dataService) {

    setInterval(() => { this.time = this.service.getTime(); }, 1000);
  }

 @Output() products$: Product[];
  date;
  time;
  clock;


  ngOnInit() {
    this.date = this.service.getdate();

   
    return this.DataService.getProductsData().subscribe(data => (this.products$ = data));
    
  }

}
