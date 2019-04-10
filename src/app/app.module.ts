import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-page/login-form/login-form.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HomeComponent } from './main-page/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ProfileComponent } from './main-page/profile/profile.component';
import { CurrentInvigilationComponent } from './main-page/current-invigilation/current-invigilation.component';
import { InvigilationDetailsComponent } from './main-page/invigilation-details/invigilation-details.component';

import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { LecturerService } from './shared/services/lecturer.service';
import { InvigilationService } from './shared/services/invigilation.service';
import { PeekInvigilationComponent } from './main-page/peek-invigilation/peek-invigilation.component';
import { TimerComponent } from './shared/components/timer/timer.component';
import { CountdownPipe } from './shared/pipes/countdown.pipe';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'now', component: CurrentInvigilationComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'invigilations/:key', component: InvigilationDetailsComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginFormComponent,
    MainPageComponent,
    HomeComponent,
    NavbarComponent,
    LoadingComponent,
    ProfileComponent,
    CurrentInvigilationComponent,
    InvigilationDetailsComponent,
    PeekInvigilationComponent,
    TimerComponent,
    CountdownPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FontAwesomeModule
  ],
  providers: [AuthService, AuthGuard, LecturerService, InvigilationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
