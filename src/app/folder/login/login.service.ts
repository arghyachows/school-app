import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';

@Injectable()
export class LoginService {
    private userURL = "https://tutorial-app-secured-v1.herokuapp.com/api/Users";
    private headers = new HttpHeaders({ 'Content-Type': "application/json" });

    constructor(private http: HttpClient, private toastController: ToastController, private router: Router, private userService: UserService) { }

    async presentToast(message, type) {
        const toast = await this.toastController.create({
            message: message,
            color: type,
            duration: 2000
        });
        toast.present();
    }


    //method to register User 
    public registerUser(user: User): Promise<any> {
        return this.http.post(this.userURL, JSON.stringify(user), { headers: this.headers })
            .toPromise()
            .then(response => {
                console.log("Response Caught ", response);
                this.presentToast('Sign Up Successful!', 'success')
            })
            .catch(err => this.handleError(err));
        ;
    }

    //method to login User
    public loginUser(user: User): Promise<any> {
        return this.http.post(this.userURL + '/login', JSON.stringify(user), { headers: this.headers })
            .toPromise()
            .then(response => {
                console.log("Response Caught ", response);
                this.presentToast('Welcome ' + user.username + "!", 'success');
                this.userService.changeUser(user.username);
                this.router.navigate(['']);

            })
            .catch(err => this.handleError(err));
        ;
    }

    private handleError(err: any) {
        console.log("Error Response Caught ", err)
        this.presentToast(err.error.error.message, 'danger');
    }
}