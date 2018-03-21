import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { MaterialModule } from './core/material.module'
import { AuthService } from './core/auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductComponent } from './product/product.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { SignoutComponent } from './signout/signout.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment} from '../environments/environment';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-email', component: LoginEmailComponent },
  { path: 'product', component: ProductComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signout', component: SignoutComponent },
  { path: '', component : HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    LoginEmailComponent,
    SignoutComponent,
    DialogDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [DialogDeleteComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
