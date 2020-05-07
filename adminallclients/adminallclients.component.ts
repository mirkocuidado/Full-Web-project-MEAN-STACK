import { Component, OnInit } from '@angular/core';
import { Farmer } from '../farmer.module';
import { Enterprise } from '../enterprise.model';
import { FarmerService } from '../farmer.service';
import { EnterpriseService } from '../enterprise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminallclients',
  templateUrl: './adminallclients.component.html',
  styleUrls: ['./adminallclients.component.css']
})
export class AdminallclientsComponent implements OnInit {

  constructor(private farmerService: FarmerService, private enterpriseService: EnterpriseService, private router: Router) { }

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
    this.farmerService.deleteFarmer(username).subscribe( () => {});
    location.reload();
  }

  remove_enterprise(username){
    this.enterpriseService.deleteEnterprise(username).subscribe( () => {});;
    location.reload();
  }

  edit_farmer(username){
    this.router.navigate(["/editfarmer/" + username ]);
  }

  edit_enterprise(username){
    this.router.navigate(["/editenterprise/" + username ]);
  }

  ngOnInit(): void {
    this.getFarmers();
    this.getEnterprises();
  }
}
