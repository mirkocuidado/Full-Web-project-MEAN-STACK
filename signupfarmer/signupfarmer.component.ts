import { OnInit } from '@angular/core';
import { FarmerService} from '../../app/farmer.service';
import { Router } from '@angular/router';
import { Farmer} from '../../../../backend/models/Farmer';
import { Enterprise } from '../../../../backend/models/Enterprise';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EnterpriseService } from '../enterprise.service';

@Component({
  selector: 'app-signupfarmer',
  templateUrl: './signupfarmer.component.html',
  styleUrls: ['./signupfarmer.component.css']
})
export class SignupfarmerComponent implements OnInit {

  farmerForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
    confirm_password: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required])
  });

  register_farmer(){
    this.flagg = 0;

    for(let i=0; i<this.farmers.length; i++){
      if(this.farmers[i].username == this.farmerForm.value.username){
        this.flagg = 1;
        alert("Username already in use!");
        break;
      }
      if(this.farmers[i].mail == this.farmerForm.value.mail){
        this.flagg = 1;
        alert("E-mail already in use!");
        break;
      }
    }
    
    for(let i=0; i<this.enterprises.length; i++){
      if(this.enterprises[i].username == this.farmerForm.value.username){
        this.flagg = 1;
        alert("Username already in use!");
        break;
      }
      if(this.enterprises[i].mail == this.farmerForm.value.mail){
        this.flagg = 1;
        alert("E-mail already in use!");
        break;
      }
    }
    
    if(this.flagg === 0){
      let reg1 = /[A-Z]+/;
      let reg2 = /\d+/;
      let reg3 = /[a-z]+/;
      let reg4 = /\w{8}/;
      let mailCheck = /^[\w\d\\.]+@\w+\.\w+$/;
      let passCheck2 = /[a-z]/i;
      let phoneCheck = /06\d{8}/;
      
      if(this.farmerForm.value.password !== this.farmerForm.value.confirm_password){
        alert("Password does not match the confirmed one!");
      }
      else{
        if(!reg1.test(this.farmerForm.value.password) || !reg2.test(this.farmerForm.value.password) || !reg3.test(this.farmerForm.value.password) || !reg4.test(this.farmerForm.value.password) || !passCheck2.test(this.farmerForm.value.password[0])){
          alert("Invalid password!");
        }
        else{
          if(!mailCheck.test(this.farmerForm.value.mail)){
            alert("Invalid e-mail address!");
          }
          else if(!phoneCheck.test(this.farmerForm.value.mobile)){
            alert("Invalid mobile phone format!");
          }
          else{
            if(this.flag===true){
              this.farmerService.addFarmerREQ(this.farmerForm.value.first_name, this.farmerForm.value.last_name,this.farmerForm.value.username, this.farmerForm.value.password, this.farmerForm.value.confirm_password, this.farmerForm.value.date,this.farmerForm.value.mobile,  this.farmerForm.value.place, this.farmerForm.value.mail).subscribe(()=>{
                this.router.navigate([""]);
              });
            }
            else{
              alert(" YOU HAVE TO CHECK THE ROBOT FIELD!");
            }
          }
        }
      }
    }
    
  }

  constructor(private enterpriseService: EnterpriseService, private farmerService: FarmerService, private router: Router) { }

  ngOnInit(): void {
    this.farmerService.getFarmers().subscribe( (pom: Farmer[]) => {
      this.farmers = pom;
    });
    this.enterpriseService.getEnterprises().subscribe( (pom: Enterprise[]) => {
      this.enterprises = pom;
    });
  }

  farmers: Farmer [] = [];
  enterprises: Enterprise [] = [];

  recaptcha: any;
  
  flag: boolean;
  flagg: number;

  resolved(captchaResponse: any[]){
    this.recaptcha = captchaResponse;
    this.flag=true;
  }
}
