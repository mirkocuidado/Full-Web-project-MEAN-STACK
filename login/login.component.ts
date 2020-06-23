import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnterpriseService } from '../enterprise.service';
import { UserService } from '../user.service';
import { Farmer } from '../farmer.module';
import { Enterprise } from '../enterprise.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private farmerService: FarmerService,private enterpriseService: EnterpriseService, private router: Router, private user: UserService) { }

  farmerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  msg: String;
  flag:Boolean;

  farmers: Farmer[] = [];
  enterprises: Enterprise[] = [];
  

  nope():void{
    alert("This is implemented on github, this version does not have it.");
  }

  ngOnInit(): void {
    this.msg="";

    this.farmerService.getFarmers().subscribe( (p:Farmer[])=>{
      this.farmers = p;
    });

    this.enterpriseService.getEnterprises().subscribe( (p:Enterprise[])=>{
      this.enterprises = p;
    });

     
  }

  login(){
    let flag = 0;
    this.user.setLogged(this.farmerForm.value.username);
    localStorage.setItem("logged", this.farmerForm.value.username);

    for(let i =0; i<this.farmers.length; i++){
      if(this.farmers[i].username === this.farmerForm.value.username && this.farmers[i].password === this.farmerForm.value.password){
        flag = 10;
        break;
      }
    }

    if(flag === 0){
      for(let i =0; i<this.enterprises.length; i++){
        if(this.enterprises[i].username === this.farmerForm.value.username && this.enterprises[i].password === this.farmerForm.value.password){
          flag = 20;
          break;
        }
      }
    }

    if(flag===0){
      this.farmerService.getAdminLogIn(this.farmerForm.value.username,this.farmerForm.value.password);
      flag = 3;
    }


    if(flag===10){
      this.router.navigate(["/farmerhome"]);
    }
    else if(flag === 20){
      this.router.navigate([`/workerhome`]);
    }
    else if(flag===3) {}
    else{
      this.msg = "Invalid parameters!";
    }
  }

}
