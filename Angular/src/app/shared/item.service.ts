/* Anni */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.model';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ItemService {
  constructor(private http: HttpClient) { }

  postItem(item: Item): Observable<Item> {
    return this.http.post<Item>(environment.host + '/items', item, httpOptions);
  }

  deleteItem(userEmail: string, productID: number) {
    return this.http.delete(environment.host + `/items/${userEmail}/${productID}`);
  }

  getCart(userEmail: string) {
    return this.http.get(environment.host + `/items/${userEmail}`);
  }

  putItem(userEmail: string, item: Item, productID: number) {
    return this.http.put(environment.host + `/items/${userEmail}/${productID}`, item, httpOptions);
  }
}
