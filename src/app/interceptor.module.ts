import {Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor{
    intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const dupRequest = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin','*')})
        return next.handle(dupRequest)
    }
}
@NgModule({
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
    ]
})
export class InterceptorModule {}