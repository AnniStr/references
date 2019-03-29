/* Leah */

import {HttpInterceptor, HttpXsrfTokenExtractor, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'X-XSRF-TOKEN';
    console.log('xsrf interceptor called');
    const token = this.tokenExtractor.getToken() as string;
    console.log('xsrf token: (vor if abfrage) ' + token);
    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({ headers: req.headers.set(headerName, token) });
      console.log('xsrf token: (in if abfrage) ' + token);
    }
    return next.handle(req);
  }

}
