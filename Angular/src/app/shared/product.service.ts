/* Anni */
// Services bieten geteilte Daten an: Schnittstelle zwischen Backend und Frontend

import { Injectable, Inject, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Product } from './product.model'; // hier ist festgelegt, welche Objekte Product enthält
import { NGXLogger } from 'ngx-logger';
import {environment} from '../../environments/environment';

@Injectable() // wird in Component eingebunden, um dort die Daten anzubieten
export class ProductService {
  public productsDE: Product[]; /* Array aller Produkte (Produktschnittstelle zwischen Backend und Frontend) */
  public productsEN: Product[];
  readonly productURL = environment.host + '/products'; // Products aus Node/Express Controller

  constructor (private http: HttpClient,
              @Inject(SESSION_STORAGE) public storage: WebStorageService, public logger: NGXLogger) {}  // für http request

  getProductList() {
    return this.http.get(this.productURL); // GET Produkte von localhost:3000/products
  }

  getProduct(id) {
    return this.http.get(`${this.productURL}/${id}`);
  }

  // Language Change Julia & Anni
  // Produkte aus DB werden nach Sprache aufgeteilt und in Session gespeichert
  showProductList(category = '') {
    this.getProductList().subscribe((res) => { // GET Produkte aus Service
      /* asignt res(Produkte aus GET request) auf products in Service, um darauf vom Template aus zugreifen zu können */
      this.productsDE = [{}] as Product[];
      this.productsEN = [{}] as Product[];
      const helper = res as Product[];
      let indexDE = 0;
      let indexEN = 0;
      for (const i in helper) {
        if (helper[i].category === category || category === '') {
          if (helper[i].language === 'de') {
            this.productsDE[indexDE] = helper[i];
            indexDE ++;
          } else if (helper[i].language === 'en') {
            this.productsEN[indexEN] = helper[i];
            indexEN ++;
          } else {
            this.logger.log('error', 'Error in product.service: no language set');
          }
        }
      }
      sessionStorage.setItem('productsDE', JSON.stringify(this.productsDE));
      sessionStorage.setItem('productsEN', JSON.stringify(this.productsEN));
    });
  }
}
