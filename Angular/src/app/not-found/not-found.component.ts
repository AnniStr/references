/* Jannik */

import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

export class NotFoundComponent implements OnInit {

  constructor(private response: HttpErrorResponse) { }

  ngOnInit() {
    this.response.headers.set(status, '404');
  }

}
