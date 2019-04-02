import { Component, OnInit } from '@angular/core';
import { CartItem } from 'entities/cartItem';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'services/productService';
import { Product } from 'entities/Product';
import { dataService } from 'services/dataservice';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private cartitems: CartItem[] = [];
  
  date;
  time;
  total: number ;
  prod: Product;
 

  constructor(private activeRout: ActivatedRoute, private DataService: dataService,private service: ProductService) { 
    setInterval(() => { this.time = this.service.getTime(); }, 1000);
  }

  ngOnInit() {
    this.date = this.service.getdate();
    this.activeRout.params.subscribe(params => {
      var id = params['id'];


      if (id) {

      /*   this.DataService.getSingleProd(id).subscribe(data => {
          if (data) {
            this.prod = data;
          }
        }) */

        var item: CartItem = {
          product:this.DataService.findProduct(id),
          quntity: 1

        };

        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));

          localStorage.setItem('cart', JSON.stringify(cart))
        }
        else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let cartItemExist: number = -1;

          for (let i = 0; i < cart.length; i++) {
            let item: CartItem = JSON.parse(cart[i])
            if (item.product.id == id) {
              cartItemExist = i;
              break;
            }
          }


          if (cartItemExist == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          }

          else {
            let item: CartItem = JSON.parse(cart[cartItemExist])
            item.quntity += 1;
            cart[cartItemExist] = JSON.stringify(item);
            localStorage.setItem('cart', JSON.stringify(cart))

          }
        }

        this.loadCart();
      }

      else {
        this.loadCart();
      }
    });

  }








  
  loadCart(): void {
    this.total = 0;
    this.cartitems = [];
    let cart = JSON.parse(localStorage.getItem('cart'));

    for (let i = 0; i < cart.length; i++) {
      let item = JSON.parse((cart[i]));
      if (item != null) {
        this.cartitems.push({
          product: item.product,
          quntity: item.quntity
        });
      }

      this.total += item.product.price * item.quntity;
     
    }
  }

  changeQuntity(id, action) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let update: number;
    console.log(cart);

    switch (action) {

      case "plus":

        for (let i = 0; i < cart.length; i++) {
          let item: CartItem = JSON.parse(cart[i])
          if (item.product.id == id) {
            update = i;

            item.quntity++;
            cart[update] = JSON.stringify(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            this.loadCart();
            break;
          }
        }
        break;
      case "minus":
        for (let i = 0; i < cart.length; i++) {
          let item: CartItem = JSON.parse(cart[i])
          if (item.product.id == id) {
            update = i;
            if (item.quntity > 0) {
              item.quntity--;
            }

            cart[update] = JSON.stringify(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(JSON.parse(localStorage.getItem('cart')));
            this.loadCart();

            break;
          }
        }
        break;

      default:
        break;
    }

  }

}


