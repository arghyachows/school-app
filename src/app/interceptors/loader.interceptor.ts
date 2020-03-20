import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoadingController } from '@ionic/angular';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    loaderToShow: any;
    constructor(public loadingController: LoadingController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.presentLoading()
        return next.handle(req).pipe(
            finalize(() => this.closeLoading())
        );
    }

    //Loading Presenter
    async presentLoading() {
        this.loaderToShow = await this.loadingController.create({
            message: 'Please wait...'
        });
        await this.loaderToShow.present();


    }

    async closeLoading() {
        await this.loaderToShow.dismiss();
        console.log('Loading dismissed!');
    }

}