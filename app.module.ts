import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from "ng-recaptcha";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupfarmerComponent } from './signupfarmer/signupfarmer.component';
import { SignupenterpriseComponent } from './signupenterprise/signupenterprise.component';
import { FarmerhomeComponent } from './farmerhome/farmerhome.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';

import { CountdownModule} from 'ngx-countdown';

import { MatTableModule } from '@angular/material/table';
import { MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';

import {FarmerService} from './farmer.service';
import {HttpClientModule} from '@angular/common/http';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminallclientsComponent } from './adminallclients/adminallclients.component';
import { AdminaddnewfarmerComponent } from './adminaddnewfarmer/adminaddnewfarmer.component';
import { AdminaddnewenterpriseComponent } from './adminaddnewenterprise/adminaddnewenterprise.component';
import { EditfarmerComponent } from './editfarmer/editfarmer.component';
import { EditenterpriseComponent } from './editenterprise/editenterprise.component';
import { SeedlingComponent } from './seedling/seedling.component';
import { StorageComponent } from './storage/storage.component';
import { ShopComponent } from './shop/shop.component';
import { CommentsComponent } from './comments/comments.component';
import { WorkerhomeComponent } from './workerhome/workerhome.component';
import { WorkerallproductsComponent } from './workerallproducts/workerallproducts.component';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { BusinessComponent } from './business/business.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupfarmerComponent,
    SignupenterpriseComponent,
    FarmerhomeComponent,
    PasswordchangeComponent,
    AdminhomeComponent,
    AdminallclientsComponent,
    AdminaddnewfarmerComponent,
    AdminaddnewenterpriseComponent,
    EditfarmerComponent,
    EditenterpriseComponent,
    SeedlingComponent,
    StorageComponent,
    ShopComponent,
    CommentsComponent,
    WorkerhomeComponent,
    WorkerallproductsComponent,
    BusinessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    CountdownModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
    
  ],
  providers: [FarmerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
