// Julia und Anni

import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { ProductsComponent } from './products.component';
import { UserService } from '../shared/user.service';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item.model';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-products-content',
  templateUrl: './productsContent.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService, ItemService, NGXLogger]
})
export class ProductsContentComponent extends ProductsComponent implements OnInit {

  constructor (
      public userService: UserService,
      public itemService: ItemService,
      public productService: ProductService,
      public _router: Router,
      public logger: NGXLogger,
      @Inject(SESSION_STORAGE) public storage: WebStorageService) {
    super(userService, itemService, productService, _router, logger, storage);
  }

  // ProductsContentComponent wird in products.component.html einmal für DE und einmal für EN Produkte eingebunden,
  // die Variable products sind dann je nach dem getProductsEN() oder getProductsDE() aus products.component.ts
  @Input() products: Product[];

  ngOnInit() {
    this.showDetails = false;
    this.selectedProduct = this.getselectedProduct() || undefined;
    this.getCartUserDetails();
  }

}
