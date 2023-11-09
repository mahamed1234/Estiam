import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from "@angular/router";

import {UserViewComponent} from "./components/user-view/user-view.component";
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';

import { ListeventsComponent } from './components/listevents/listevents.component';
import { AuthGuard } from './auth.guard';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
    {
        path: '',
         redirectTo: '/login', 
         pathMatch: 'full' 
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'Login' },
      },
    {
        path: 'users',
        component: UserViewComponent
    },
    
    {
        path: 'calendar',
        canActivate: [AuthGuard],
        component: CalendarComponent
    },

   
    {
        path: 'listevents',
        canActivate: [AuthGuard],
        component:ListeventsComponent

    },
    {
        path: 'editprofile',
        canActivate: [AuthGuard],
        component:EditProfileComponent

    },
    ];
 



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
