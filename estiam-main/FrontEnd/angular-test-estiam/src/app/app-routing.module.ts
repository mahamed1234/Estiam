import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from "@angular/router";

import {UserViewComponent} from "./components/user-view/user-view.component";
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { ChangepasswdComponent } from './components/changepasswd/changepasswd.component';
import { ListeventsComponent } from './components/listevents/listevents.component';
import { AuthGuard } from './auth.guard';

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
        path: 'changepasswd',
        component:ChangepasswdComponent

    },
    {
        path: 'listevents',
        canActivate: [AuthGuard],
        component:ListeventsComponent

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
