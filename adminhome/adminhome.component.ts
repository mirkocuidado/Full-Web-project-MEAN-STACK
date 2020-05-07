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
  }

  add_farmer(username, a){
    this.farmerService.getFarmerREQById(username, a);
  }

  ngOnInit(): void {
    this.getFarmers();
    this.getEnterprises();
  }

}
