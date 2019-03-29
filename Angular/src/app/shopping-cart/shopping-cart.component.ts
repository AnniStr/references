/* Anni */

import { Component, OnInit, Inject, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ProductService } from '../shared/product.service';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [ProductService, ItemService]
})

@NgModule({
  imports: [
    CommonModule
  ]
})

export class ShoppingCartComponent implements OnInit {

  public cart: Item[] = [] as Item[];
  public price = 0;
  public userDetails;

  constructor(private userService: UserService,
              private itemService: ItemService,
              public _router: Router,
              public productService: ProductService,
              @Inject(SESSION_STORAGE) public storage: WebStorageService) {
    this.setCartPrice();
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) { // Wenn Benutzer eingeloggt ist, Warenkorb aus DB abrufen..
      this.userService.getUserProfile().subscribe(
          res => {
            this.userDetails = res['user'];
            this.itemService.getCart(this.userDetails.email).subscribe(
              resource => {
                const items = resource as Item[];
                items.forEach(item => {
                  this.cart.push(item);
                });
                sessionStorage.clear();
                this.setCartPrice();
              },
              error => { console.log(error); }
            );
          },
          err => { console.log(err); }
      );
    } else { // ..ansonsten Warenkorb aus Session abrufen
      this.cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      this.setCartPrice();
    }
  }

  changeQuantity(increase: Boolean, i: number) {
    const item = this.cart[i];
    if (item) {
      if (increase) {
        item.numOf ++;
      } else {
        item.numOf --;
      }
      if (item.numOf < 1) {
        this.deleteCartItem(i);
      } else {
        if (this.userService.isLoggedIn()) {
          this.itemService.putItem(this.userDetails.email, item, item.product.productID).subscribe(
            res => { console.log(res); },
            error => { console.log(error); }
          );
        }
        this.endChange();
      }
    }
  }

  deleteCartItem(i: number) {
    const item = this.cart[i];
    if (this.userService.isLoggedIn()) {
      this.itemService.deleteItem(this.userDetails.email, item.product.productID).subscribe(
        res => { console.log(res); },
        error => { console.log(error); }
      );
    }
    this.cart.splice(i, 1); // delete Item from Cart if numOf <1
    this.endChange();
  }

  endChange() {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    this.setCartPrice();
  }

  setCartPrice() {
    this.price = 0;
    if (this.cart) {
      this.cart.forEach(item => {
        this.price += (item.product.price * item.numOf);
      });
    }
  }
}
