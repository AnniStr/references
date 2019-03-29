// Anni
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

/*local imports*/
import { UserService } from '../../shared/user.service';
import { ProductService } from '../../shared/product.service';
import { ItemService } from '../../shared/item.service';
import { Product } from '../../shared/product.model';
import { ProductsComponent } from '../products.component';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-product-grills',
  templateUrl: '../products.component.html',
  styleUrls: ['../products.component.css'],
  providers: [ProductService, ItemService, NGXLogger],
})

export class ProductsGrillsComponent extends ProductsComponent implements OnInit {

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

  ngOnInit() {
    this.productService.showProductList('grills'); // aktuelle Liste der Produkte mit Kategorie 'grills' anzeigen
    this.getCartUserDetails();
  }

}
