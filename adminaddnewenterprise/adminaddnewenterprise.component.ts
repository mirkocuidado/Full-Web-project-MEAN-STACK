import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnterpriseService } from '../enterprise.service';
import { Router } from '@angular/router';
import { FarmerService } from '../farmer.service';
import { Farmer} from '../../../../backend/models/Farmer';
import { Enterprise } from '../../../../backend/models/Enterprise';

@Component({
  selector: 'app-adminaddnewenterprise',
  templateUrl: './adminaddnewenterprise.component.html',
  styleUrls: ['./adminaddnewenterprise.component.css']
})
export class AdminaddnewenterpriseComponent implements OnInit {

  farmers: Farmer [] = [];
  enterprises: Enterprise [] = [];
  flagg: number;

  constructor(private farmerService: FarmerService, private enterpriseService: EnterpriseService, private router: Router) { }

  enterpriseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
    confirm_password: new FormControl('', [Validators.required]),
    foundation_date: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required])
  });

  register_enterprise(){
    this.flagg = 0;

    for(let i=0; i<this.farmers.length; i++){
      if(this.farmers[i].username == this.enterpriseForm.value.username){
        this.flagg = 1;
        alert("Username already in use!");
        break;
      }
      if(this.farmers[i].mail == this.enterpriseForm.value.mail){
        this.flagg = 1;
        alert("E-mail already in use!");
        break;
      }
    }
    
    for(let i=0; i<this.enterprises.length; i++){
      if(this.enterprises[i].mail == this.enterpriseForm.value.username){
        this.flagg = 1;
        alert("Username already in use!");
        break;
      }
      if(this.enterprises[i].username == this.enterpriseForm.value.mail){
        this.flagg = 1;
        alert("E-mail already in use!");
        break;
      }
    }

    if(this.flagg ===0){
      let reg1 = /[A-Z]+/;
      let reg2 = /\d+/;
      let reg3 = /[a-z]+/;
      let reg4 = /\w{8}/;
      let mailCheck = /^\w+@\w+\.\w+$/;
      let passCheck2 = /[a-z]/i;

      if(this.enterpriseForm.value.password !== this.enterpriseForm.value.confirm_password){
        alert("Password does not match the confirmed one!");
      }
      else{
        if(!reg1.test(this.enterpriseForm.value.password) || !reg2.test(this.enterpriseForm.value.password) || !reg3.test(this.enterpriseForm.value.password) || !reg4.test(this.enterpriseForm.value.password) || !passCheck2.test(this.enterpriseForm.value.password[0])){
          alert("Invalid password!");
        }
        else{
          if(!mailCheck.test(this.enterpriseForm.value.mail)){
            alert("Invalid e-mail address!");
          }
          else{
            this.enterpriseService.addEnterpriseREQ(this.enterpriseForm.value.name, this.enterpriseForm.value.username,this.enterpriseForm.value.username, this.enterpriseForm.value.password, this.enterpriseForm.value.confirm_password, this.enterpriseForm.value.foundation_date,  this.enterpriseForm.value.mail, this.enterpriseForm.value.place).subscribe(()=>{
              this.router.navigate([""]);
            });
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.farmerService.getFarmers().subscribe( (pom: Farmer[]) => {
      this.farmers = pom;
    });
    this.enterpriseService.getEnterprises().subscribe( (pom: Enterprise[]) => {
      this.enterprises = pom;
    });
  }

}
