import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Farmer} from '../../../../backend/models/Farmer';
import { Enterprise } from '../../../../backend/models/Enterprise';
import { EnterpriseService } from '../enterprise.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-editfarmer',
  templateUrl: './editfarmer.component.html',
  styleUrls: ['./editfarmer.component.css']
})
export class EditfarmerComponent implements OnInit {

  username1: string;
  farmer: Farmer;

  first_name: string;
  last_name: string;
  username2: string;
  password: string;
  confirm_password: string;
  date: string;
  place: string;
  mobile: string;
  mail: string;

  farmers: Farmer [] = [];
  enterprises: Enterprise [] = [];
  flagg: number;

  constructor(private farmerService: FarmerService, private router: Router, private user: UserService, private enterpriseService: EnterpriseService) { }
  
  register_farmer(){
    this.farmerService.addFarmer(this.first_name, this.last_name,this.username2, this.password, this.confirm_password, this.date, this.place, this.mobile, this.mail).subscribe(()=>{
      this.router.navigate([""]);
    });
  }

  edit_farmer(){

    this.flagg = 0;
    
    if(this.username1 != this.username2) {
      for(let i=0; i<this.farmers.length; i++){
        if(this.farmers[i].username == this.username2){
          this.flagg = 1;
          alert("Username already in use!");
          break;
        }
      }
      
      for(let i=0; i<this.enterprises.length; i++){
        if(this.enterprises[i].username == this.username2){
          this.flagg = 1;
          alert("Username already in use!");
          break;
        }
      }
    }

    if(this.flagg === 0){

    const f = {
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username2,
      password: this.password,
      confirm_password: this.confirm_password,
      date: this.date,
      place: this.place,
      mobile: this.mobile,
      mail: this.mail
    };

      let reg1 = /[A-Z]+/;
      let reg2 = /\d+/;
      let reg3 = /[a-z]+/;
      let reg4 = /\w{8}/;
      let mailCheck = /^\w+\.*\w+@\w+\.\w+$/;
      let passCheck2 = /[a-z]/i;

      if(this.password !== this.confirm_password){
        alert("Password does not match the confirmed one!");
      }
      else{
        if(!reg1.test(this.password) || !reg2.test(this.password) || !reg3.test(this.password) || !reg4.test(this.password) || !passCheck2.test(this.password[0])){
          alert("Invalid password!");
        }
        else{
          if(!mailCheck.test(this.mail)){
            alert("Invalid e-mail address!");
          }
          else{
            this.farmerService.updateFarmer(this.username1, f);
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

    this.username1 = localStorage.getItem("edit");
    this.farmerService.getFarmerByUsername(this.username1).subscribe( (pomFarmer: Farmer) => {
      this.first_name = pomFarmer.first_name;
      this.last_name = pomFarmer.last_name;
      this.username2 = pomFarmer.username;
      this.password = pomFarmer.password;
      this.confirm_password = pomFarmer.confirm_password;
      this.date = pomFarmer.birth_date;
      this.place = pomFarmer.place;
      this.mobile = pomFarmer.mobile;
      this.mail = pomFarmer.mail;
    });
  }

}
