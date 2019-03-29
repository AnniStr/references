/* Anni (Julia: Anpassungen für Sprachen) */

import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { UserService } from '../shared/user.service';
import { ProductService } from '../shared/product.service';
import { ItemService } from '../shared/item.service';
import { Product } from '../shared/product.model';
import { Item } from '../shared/item.model';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService, ItemService, NGXLogger]
})

export class ProductsComponent implements OnInit {

  public selectedProduct: Product;
  public showDetails: Boolean = false;
  public product: Product;
  public cart: Item[] = [] as Item[];
  public userDetails = null;

  constructor (
      public userService: UserService,
      public itemService: ItemService,
      public productService: ProductService,
      public _router: Router,
      public logger: NGXLogger,
      @Inject(SESSION_STORAGE) public storage: WebStorageService) {}

  ngOnInit() {
    this.productService.showProductList();
    this.showDetails = false;
    this.selectedProduct = this.getselectedProduct() || undefined;
    this.getCartUserDetails();
  }

  getCartUserDetails() {
    if (this.userService.isLoggedIn()) { // Wenn Benutzer eingeloggt ist, Warenkorb von Datenbank abrufen ..
      this.userService.getUserProfile().subscribe(
          res => {
            this.userDetails = res['user'];
            this.itemService.getCart(this.userDetails.email).subscribe( // Warenkorb aus MongoDB abrufen (über Service item.service.ts)
              resource => {
                const items = resource as [];
                items.forEach(item => {
                  this.cart.push(item); // Warenkorb Inhalte in Klassenvariable speichern
                });
              },
              error => { this.logger.log('error', `Error in Angular products.component trying to get Cart : ${error}`); }
            );
          },
          err => { this.logger.log('error', `Error in Angular products.component trying to get UserDetails : ${err}`); }
      );
    } else { // ..ansonsten aus der Session
      this.cart = JSON.parse(sessionStorage.getItem('cart')) || []; // Warenkorb Inhalte in Klassenvariable speichern
    }
  }

  showProductDetails(product: Product) {
    this.selectProduct(product); // zwischenspeichern welches Product gewählt wurde (falls dieses in Warenkorb gelegt wird)
    this.toggleDetails(true); // Details anzeigen, Liste aublenden
  }

  setItem(product: Product) {
    this.selectProduct(product); // zwischenspeichern welches Product gewählt wurde (für Popup)
    this.addToCart(product); // Product zum Warenkorb hinzufügen
  }

  addToCart(product: Product) {
    let exists = false;
    const newItem: Item = new Item;
    newItem.product = product;
    newItem.numOf = 1; // Produkt, das noch nicht im Warenkorb liegt -> Anzahl anfangs immer 1
    if ( this.cart ) {
      if ( this.cart.length > 0 ) { // Wenn das Produkt schon im Warenkorb liegt, nur Anzahl erhöhen..
        this.cart.forEach(item => {
          if ( item.product.productID === product.productID) {
            item.numOf ++;
            exists = true;
          }
        });
      }
      if (!exists) { // ..ansonsten neues produkt hinzufügen
        this.cart.push(newItem);
      }
    } else {
      this.cart = [newItem];
    }
    if (!this.userService.isLoggedIn()) { // Außerdem Warenkorb aktuallisieren ..in der Session
      sessionStorage.setItem('cart', JSON.stringify(this.cart));
    } else { // ..in der Datenbank
      newItem.userEmail = this.userDetails.email;
      this.itemService.postItem(newItem).subscribe(
        res => { this.logger.log('info', `Success in Angular products.component addToCart postItem: ${res}`); },
        error => { this.logger.log('error', `Error in Angular products.component addToCart trying to postItem: ${error}`); }
      );
    }
  }

  toggleDetails(showDetails: Boolean) {
    sessionStorage.setItem('showDetails', JSON.stringify(showDetails));
    this.showDetails = showDetails;
  }

  getshowDetails(): Boolean {
    return JSON.parse(sessionStorage.getItem('showDetails'));
  }

  selectProduct(product: Product) {
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    this.selectedProduct = this.getselectedProduct();
  }

  getisLanguageSet(): Boolean { // wurde Deutsch als Sprache ausgewählt?
    return JSON.parse(sessionStorage.getItem('langIsSet'));
  }

  getProductsEN(): Product[] { // Englische Produkte abrufen
    return JSON.parse(sessionStorage.getItem('productsEN'));
  }

  getProductsDE(): Product[] { // Deutsche Produkte abrufen
    return JSON.parse(sessionStorage.getItem('productsDE'));
  }

  getselectedProduct(): Product {
    return JSON.parse(sessionStorage.getItem('selectedProduct'));
  }

}
