import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class MyWalletInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('INTERCEPTING')
    if (localStorage.getItem('token')) {
        const authHeader = req.clone({
            headers: req.headers.set('X-AUTH-HEADER', localStorage.getItem('token') || '{}')
        })
        req = authHeader;
    }
    return next.handle(req);
}

}