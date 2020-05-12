import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmerService } from '../farmer.service';
import { Offer } from '../../../../backend/models/Offers';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-workerallproducts',
  templateUrl: './workerallproducts.component.html',
  styleUrls: ['./workerallproducts.component.css']
})
export class WorkerallproductsComponent implements OnInit {

  constructor(private farmerService: FarmerService, private router: Router, private _formBuilder: FormBuilder) { }

  offers:Offer[] = [];

  name: String;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup : FormGroup;
  fourthFormGroup:FormGroup;
  fifthFormGroup: FormGroup;

  submit() {
    let a = this.fourthFormGroup.value.fourthCtrl;
    let tip ="";
    if(a==="plant" || a==="Plant" || a==="PLANT") tip="pl";
    else if(a==="product" || a==="Product" || a==="PRODUCT") tip="pr";

    if(tip!=""){

      let flag = 0;
      
      for(let i=0; i<this.offers.length; i++)
        if(this.offers[i].name === this.firstFormGroup.value.firstCtrl){
          flag = 1;
          break;
        }

      if(flag === 0){
        this.farmerService.addOffer(this.firstFormGroup.value.firstCtrl, this.name, this.fifthFormGroup.value.fifthCtrl, this.thirdFormGroup.value.thirdCtrl, this.secondFormGroup.value.secondCtrl, tip).subscribe( () => {
          location.reload();
        });
      }
      else if(flag===1){
        this.farmerService.updateOffers(this.name, this.firstFormGroup.value.firstCtrl, -this.thirdFormGroup.value.thirdCtrl, this.name);
        location.reload();
      }
    }
    else alert("Invalid type! Try with Product or Plant!");
   
  }

  vrati(name){
    this.farmerService.deleteOffer(name).subscribe( () => {
      location.reload();
    });
  }

  user: string;

  ngOnInit(): void {

    this.user = localStorage.getItem("logged");

    this.farmerService.getOffersEnterprise(this.user).subscribe( (pom: Offer[] )=>{
      this.offers = pom;
    });

    this.name = this.user;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
      
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
  }

  postavi(a){
    localStorage.setItem("product",a);
    localStorage.setItem("enterprise", this.user);
  }
}
