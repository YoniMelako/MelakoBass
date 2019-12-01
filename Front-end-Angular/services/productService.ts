import { Injectable } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { Product } from 'entities/Product';


@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor() { }

//return a local date
    public getdate() {
        return formatDate(Date.now(), 'dd/MM/yyyy', 'en-US');
    }
    time;
//return a local time
    public getTime() {
        return this.time = formatDate(Date.now(), 'h:mm:ss/a', 'en-US');
    }

//return static array of products
    public getproducts(): Product[] {

        return [{
            id: 1,
            name: 'beat pro',
            imgUrl: '../../assets/imges/beat.jpg',
            price: 100,
            catName: 'Professional Headphones'

        },
        {
            id: 2,
            name: 'classic JBL',
            imgUrl: '../../assets/imges/jbl.jpg',
            price: 82,
            catName: 'Professional Headphones'
        },
        {
            id: 3,
            name: 'House Of Marley',
            imgUrl: '../../assets/imges/marley.jpg',
            price: 130,
            catName: 'Professional Headphones'
        },
        {
            id: 4,
            name: 'Old School Marshel',
            imgUrl: '../../assets/imges/marshel.jpg',
            price: 75,
            catName: 'Professional Headphones'
        }
        ];


    }
//return a priduct from static array
    find(id: number): Product {

        return this.getproducts()[this.getSelectedIndex(id)];
    }

    private getSelectedIndex(id: number) {

        for (var i = 0; i < this.getproducts().length; i++) {
            if (this.getproducts()[i].id == id) {
                return i;
            }
        }
        return -1;
    }

}
