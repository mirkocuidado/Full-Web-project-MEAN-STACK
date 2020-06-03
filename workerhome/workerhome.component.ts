/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmerService } from '../farmer.service';
import { Order } from '../../../../backend/models/Order';
import { Enterprise } from '../../../../backend/models/Enterprise';
import { Farmer } from '../../../../backend/models/Farmer';
import { EnterpriseService } from '../enterprise.service';
import { Nursery } from '../../../../backend/models/Nursery';

@Component({
  selector: 'app-workerhome',
  templateUrl: './workerhome.component.html',
  styleUrls: ['./workerhome.component.css']
})
export class WorkerhomeComponent implements OnInit {

  constructor(private farmerService: FarmerService, private router: Router, private enterpriseService: EnterpriseService) { }

  orders:Order[] = [];

  niz: any [] = [];
  cene: any[] = [];

  matrix;

  sortF(a,b):number{
    if(a<b) return -1;
    if(a>b) return 1;
    else return 0;
  }

  toggle:number;

  sort():void{
    if(this.toggle==0){
      this.orders.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      this.toggle = 1;
    }
    else{
      this.orders.sort((b,a) => new Date(b.time).getTime() - new Date(a.time).getTime());
      this.toggle = 0;
    }
  }

  process_Order(b,a){
    if(b==0){
      for(let i =0; i<this.niz[a].length; i++){
        this.farmerService.updateOffers(this.niz[a][i].enterprise, this.niz[a][i].name, -this.niz[a][i].quantity, this.niz[a][i]);
      }
      this.enterpriseService.deleteOrder2(this.username, this.orders[a].time).subscribe( () => { 
        this.orders.splice(a,1);
      });
    }
    else if(b==1){
      if(this.postman<5){
        this.orders[a].flag=2;
        this.nizz[this.postman]=1;
        this.postman = this.postman + 1;
        
        console.log("Sada, this.postman = " + this.postman);
        let b = this.orders[a].storage;
        this.farmerService.getNurseryByUsernameAndName(this.orders[a].username, b).subscribe( (pom: Nursery) => {
          this.matrix.getDistanceMatrix({
            origins: [`${this.place}, Srbija`],
            destinations: [ `${pom.place}, Srbija`],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC
          }, (response, status)=>{
            if(status!=='OK')
              console.log(status);
            else{
              
              let time = response.rows[0].elements[0].duration.value;
              console.log(time);
              
              this.farmerService.updateOrder(this.orders[a].time, this.username, this.orders[a]); //flag = 2
              this.enterpriseService.updatePostman(this.username, this.postman, time, this.nizz, this.orders[a].time);
            }
          });
        });
      }
      else{
        this.enterpriseService.updateOrder(this.orders[a].time, this.username, this.orders[a]); // flag = 3
          this.orders[a].flag = 3;
          this.orders.sort((bb,aa) => aa.flag - bb.flag);
          alert("Now it's gold, so you know to send it next");
      }
    }
  }

  username: String;
  place: String;

  postman: number;
  nizz: number[] = [];
  
  ngOnInit(): void {
    this.username = localStorage.getItem("logged");

    this.enterpriseService.getEnterpriseByUsername(this.username).subscribe( (pom: Enterprise) => {
      this.place = pom.place;
    });

    this.matrix = new google.maps.DistanceMatrixService();

    this.enterpriseService.getOrders(this.username).subscribe( (pom: Order[]) => {
      this.orders = pom;
      this.orders.sort((b,a) => a.flag - b.flag);
      for(let i=0; i<this.orders.length; i++){
        this.niz.push(this.orders[i].items);
        this.cene.push(this.orders[i].amount);
      }
      
      this.enterpriseService.getEnterpriseByUsername(this.username).subscribe( (pom: Enterprise) => {
        this.postman = pom.postman;
        for(let i=0; i<this.postman; i++)
          this.nizz[i]=1;
      });
    });
    this.toggle=0;
  }

}
