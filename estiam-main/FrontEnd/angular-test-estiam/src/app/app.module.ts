import { MbscModule } from '@mobiscroll/angular';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {UsersService} from "./services/users.service";
import {UserViewComponent} from './components/user-view/user-view.component';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule,} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {AppRoutingModule} from './app-routing.module';
import {TopBarComponent} from './components/common/top-bar/top-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpinnerComponent} from './components/common/spinner/spinner.component';
import {MatCardModule} from '@angular/material/card';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { PrimeIcons } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { ChangepasswdComponent } from './components/changepasswd/changepasswd.component';
import { DatePipe } from '@angular/common';
import { ListeventsComponent } from './components/listevents/listevents.component';
import { TableModule } from 'primeng/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
    declarations: [
        AppComponent,
        UserViewComponent,
        TopBarComponent,
        SpinnerComponent,
        CalendarComponent,
        LoginComponent,
        ChangepasswdComponent,
        ListeventsComponent
       
        
        
    ],
    imports: [  
    MbscModule, 
        BrowserModule,
        DatePipe,
        MenubarModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        HttpClientModule,
        MatTableModule,
        ToolbarModule,
        MatTabsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        HttpClientJsonpModule,
        MbscModule,
        MatCardModule,
        NgbModule,
        ToastModule,
        MessagesModule,
        TableModule, 
    
        
       
    
    ],
    providers: [UsersService,PrimeIcons],
    bootstrap: [AppComponent]
})
export class AppModule {
}
