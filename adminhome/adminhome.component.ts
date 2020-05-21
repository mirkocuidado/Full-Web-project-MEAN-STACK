import { Component, OnInit } from '@angular/core';
import { Farmer } from '../farmer.module';
import { FarmerService } from '../farmer.service';
import { EnterpriseService } from '../enterprise.service';
import { Enterprise } from '../enterprise.model';

import { Router } from '@angular/router';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private farmerService: FarmerService, private enterpriseService: EnterpriseService, private router: Router) { }

  farmers : Farmer [];
  enterprises : Enterprise[];

  getFarmers(){
    this.farmerService.getFarmersREQ().subscribe( (data:Farmer[]) => {
      this.farmers = data;
    });
  }

  getEnterprises(){
    this.enterpriseService.getEnterprisesREQ().subscribe( (data:Enterprise[]) => {
      this.enterprises = data;
    });
  }

  add_enterprise(username, a){
    this.enterpriseService.getEnterpriseREQById(username, a);
    for(let i=0; i<this.enterprises.length; i++)
      if(this.enterprises[i].username === username){
        this.enterprises.splice(i,1);
        break;
      }
  }

  add_farmer(username, a){
    this.farmerService.getFarmerREQById(username, a);
    for(let i=0; i<this.farmers.length; i++)
      if(this.farmers[i].username === username){
        this.farmers.splice(i,1);
        break;
      }
  }

  ngOnInit(): void {
    this.getFarmers();
    this.getEnterprises();
  }

}
