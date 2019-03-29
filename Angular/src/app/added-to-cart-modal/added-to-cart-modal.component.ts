/* Anni */

import { Component, OnInit, Input} from '@angular/core';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-added-to-cart-modal',
  templateUrl: './added-to-cart-modal.component.html',
  styleUrls: ['./added-to-cart-modal.component.css']
})
export class AddedToCartModalComponent implements OnInit {

  constructor() { }

  @Input() product: Product;

  ngOnInit() { }

}
