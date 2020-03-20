import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { ToastController } from '@ionic/angular';

@Injectable()
export class LoginService {
    private userURL = "https://tutorial-app-secured-v1.herokuapp.com/api/Users";
    private headers = new HttpHeaders({ 'Content-Type': "application/json" });

    constructor(private http: HttpClient, private toastController: ToastController) { }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            color: 'success',
            duration: 2000
        });
        toast.present();
    }

    //addProduct() creates new products 
    public registerUser(user: User): Promise<any> {
        return this.http.post(this.userURL, JSON.stringify(user), { headers: this.headers })
            .toPromise()
            .then(response => response)
            .catch(this.handleError)
            .finally(() => this.presentToast('Sign Up Successful!'));
        ;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}