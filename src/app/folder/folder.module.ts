import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { UsersComponent } from './users/users.component';
import { TimetableComponent } from './timetable/timetable.component';
import { ClassesComponent } from './classes/classes.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { LoginService } from './login/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FolderPage,
    LoginComponent,
    NewsComponent,
    UsersComponent,
    TimetableComponent,
    ClassesComponent,
    UserListComponent,
    AddUserComponent,
    NewsListComponent,
    AddNewsComponent
  ],
  providers: [
    LoginService
  ]
})
export class FolderPageModule { }
