import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './folder/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 4;
  public appPages = [
    {
      title: 'News',
      url: '/folder/News',
      icon: 'copy'
    },
    {
      title: 'Users',
      url: '/folder/Users',
      icon: 'people'
    },
    {
      title: 'Timetable',
      url: '/folder/Timetable',
      icon: 'time'
    },
    {
      title: 'Classes',
      url: '/folder/Classes',
      icon: 'easel'
    }
  ];
  username: string;
  userToken: string;
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.userService.currentUser.subscribe(user => {
      this.username = user;
      if (this.username == "Guest") {
        this.appPages.push(
          {
            title: 'Login',
            url: '/folder/Login',
            icon: 'person'
          }
        )
      } else {
        let pageIndex = this.appPages.findIndex(page => page.title == "Login");
        if (pageIndex > -1) {
          this.appPages.splice(pageIndex)
        }
      }
    })

    this.userService.currentUserToken.subscribe(userToken => {
      this.userToken = userToken;
    })
  }

  logout() {
    this.userService.changeUser("Guest");
    this.router.navigate(['folder/Login']);
  }
}
