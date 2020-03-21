import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
    private user = new BehaviorSubject<string>("Guest");
    private userToken = new BehaviorSubject<string>("");
    currentUser = this.user.asObservable();
    currentUserToken = this.userToken.asObservable();

    constructor() { }

    changeUser(user: string) {
        this.user.next(user);
    }

    changeUserToken(userToken: string) {
        this.userToken.next(userToken);
    }
}