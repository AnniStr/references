/* Anni */
import { Component, OnInit, Input, Inject } from '@angular/core';

import { Product } from '../shared/product.model';
import { Item } from '../shared/item.model';
import { ProductsComponent } from '../products/products.component';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ProductService } from '../shared/product.service';
import { ItemService } from '../shared/item.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, ItemService, NGXLogger],
})

export class ProductDetailComponent extends ProductsComponent implements OnInit {
  public selectedProduct: Product;
  public showDetails: Boolean;
  public cart: Item[] = [] as Item[];

  constructor(
      public userService: UserService,
      public itemService: ItemService,
      public productService: ProductService,
      public _router: Router,
      public logger: NGXLogger,
      @Inject(SESSION_STORAGE) public storage: WebStorageService) {
    super(userService, itemService, productService, _router, logger, storage);
    this.selectedProduct = storage.get('selectedProduct');
    this.showDetails = storage.get('showDetails');
  }

  @Input() product: Product;

  ngOnInit() {
    this.selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct'));
    this.showDetails = JSON.parse(sessionStorage.getItem('showDetails'));
    this.cart = JSON.parse(sessionStorage.getItem('cart')) as Item[] || [];
    this.getCartUserDetails();
  }

}
