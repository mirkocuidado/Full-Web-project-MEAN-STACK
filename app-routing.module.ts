import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupfarmerComponent } from './signupfarmer/signupfarmer.component';
import { SignupenterpriseComponent } from './signupenterprise/signupenterprise.component';
import { FarmerhomeComponent } from './farmerhome/farmerhome.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
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
import { BusinessComponent } from './business/business.component';


const routes: Routes = [
  {path:'' , component: LoginComponent},
  {path:'signupfarmer' , component: SignupfarmerComponent},
  {path:'signupenterprise' , component: SignupenterpriseComponent},
  {path:'farmerhome' , component: FarmerhomeComponent},
  {path:'password' , component: PasswordchangeComponent},
  {path:'adminhome', component: AdminhomeComponent},
  {path:'adminallclients', component: AdminallclientsComponent},
  {path:'adminaddnewfarmer', component: AdminaddnewfarmerComponent},
  {path:'adminaddnewenterprise', component: AdminaddnewenterpriseComponent},
  {path:'editfarmer', component: EditfarmerComponent},
  {path:'editenterprise', component: EditenterpriseComponent},
  {path:'nurseries', component: SeedlingComponent},
  {path:'storage', component: StorageComponent},
  {path:'shop', component: ShopComponent},
  {path:'comments' , component: CommentsComponent},
  {path:'workerhome' , component: WorkerhomeComponent},
  {path:'workerallproducts' , component: WorkerallproductsComponent},
  {path:'business' , component: BusinessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
