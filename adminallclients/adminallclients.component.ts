import { Component, OnInit } from '@angular/core';
import { Farmer } from '../farmer.module';
import { Enterprise } from '../enterprise.model';
import { FarmerService } from '../farmer.service';
import { EnterpriseService } from '../enterprise.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-adminallclients',
  templateUrl: './adminallclients.component.html',
  styleUrls: ['./adminallclients.component.css']
})
export class AdminallclientsComponent implements OnInit {

  constructor(private farmerService: FarmerService, private enterpriseService: EnterpriseService, private router: Router, private user:UserService) { }

  farmers : Farmer [];
  enterprises : Enterprise[];

  getFarmers(){
    this.farmerService.getFarmers().subscribe( (data:Farmer[]) => {
      this.farmers = data;
    });
  }

  getEnterprises(){
    this.enterpriseService.getEnterprises().subscribe( (data:Enterprise[]) => {
      this.enterprises = data;
    });
  }

  remove_farmer(username){
    this.farmerService.deleteFarmer(username).subscribe( () => {
      for(let i=0; i<this.farmers.length; i++)
        if(this.farmers[i].username === username){
          this.farmers.splice(i,1);
          break;
        }
    });
  }

  remove_enterprise(username){
    this.enterpriseService.deleteEnterprise(username).subscribe( () => {
      for(let i=0; i<this.enterprises.length; i++)
        if(this.enterprises[i].username === username){
          this.enterprises.splice(i,1);
          break;
        }
    });;
  }

  edit_farmer(username){
    localStorage.setItem("edit", username);
    this.router.navigate(["/editfarmer"]);
  }

  edit_enterprise(username){
    localStorage.setItem("edit", username);
    this.router.navigate(["/editenterprise"]);
  }

  ngOnInit(): void {
    this.getFarmers();
    this.getEnterprises();
  }
}
