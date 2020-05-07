import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../backend/models/Product';
import { Order } from '../../../../backend/models/Order';
import { FarmerService} from '../../app/farmer.service';
import { Router, ActivatedRoute } from '@angular/router';
import {OrderLine} from '../shop/shop.component';

import {ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private farmerService: FarmerService, private router: Router) { }

  products: Product[] = [];
  orders: Order[] = [];

  niz: any [] = [];
  cene: any[] = [];

  toggle:number;

  sortName(){
    if(this.toggle==0){
      this.products.sort((a, b) => {
          if(a.name > b.name) return 1;
          else if(a.name < b.name) return -1;
          else return 0;
      });
      this.toggle = 1;
    }
    else{
      this.products.sort((b,a) => {
        if(a.name > b.name) return 1;
        else if(a.name < b.name) return -1;
        else return 0;
    });
      this.toggle = 0;
    }
  }
  sortQuantity(){
    if(this.toggle==0){
      this.products.sort((a, b) => b.qHave - a.qHave);
      this.toggle = 1;
    }
    else{
      this.products.sort((b,a) => b.qHave - a.qHave);
      this.toggle = 0;
    }
  }
  sortManufacturer(){
    if(this.toggle==0){
      this.products.sort((a, b) => {
          if(a.enterprise > b.enterprise) return 1;
          else if(a.enterprise < b.enterprise) return -1;
          else return 0;
      });
      this.toggle = 1;
    }
    else{
      this.products.sort((b,a) => {
        if(a.enterprise > b.enterprise) return 1;
        else if(a.enterprise < b.enterprise) return -1;
        else return 0;
    });
      this.toggle = 0;
    }
  }

  delete(a):void{
    for(let i =0; i<this.niz[a].length; i++){
      this.farmerService.updateOffers(this.niz[a][i].enterprise, this.niz[a][i].name, -this.niz[a][i].quantity, this.niz[a][i]);
    }
    this.farmerService.deleteOrder(this.route.snapshot.paramMap.get('username'), this.cene[a]).subscribe( () => { 
     location.reload();});
  }

  linkHome: String;
  linkShop: String;

  ngOnInit(): void {
    this.linkHome = "../../farmerhome/"+this.route.snapshot.paramMap.get('username');
    this.linkShop = "../../shop/"+this.route.snapshot.paramMap.get('username');

    this.farmerService.getProductsForFarmer(this.route.snapshot.paramMap.get('username')).subscribe( (pom: Product[]) => {
      pom.forEach(element => {
        if(element.qHave!=0) this.products.push(element);
      });
    });

    this.toggle=0;

    this.farmerService.getOrders(this.route.snapshot.paramMap.get('username')).subscribe( (pom: Order[]) =>{
      this.orders = pom;
      for(let i=0; i<this.orders.length; i++){
        this.niz.push(this.orders[i].items);
        this.cene.push(this.orders[i].amount);
      }
    });
    
  }

}
