import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../backend/models/Product';
import { Order } from '../../../../backend/models/Order';
import { Warning } from '../../../../backend/models/Warning';
import { FarmerService} from '../../app/farmer.service';
import { Router} from '@angular/router';
import { EnterpriseService } from '../enterprise.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  constructor(private user: UserService, private farmerService: FarmerService, private router: Router, private enterpriseService: EnterpriseService) { }

  products: Product[] = [];
  orders: Order[] = [];

  niz: any [] = [];
  cene: any[] = [];

  toggle:number;

  warnings: Warning[] = [];

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
    this.farmerService.deleteOrder(this.username, this.cene[a]).subscribe( () => { 
     location.reload();});
  }

  linkHome: String;
  linkShop: String;

  username: String;

  ngOnInit(): void {

    this.username = localStorage.getItem("logged");

    this.linkHome = "../../farmerhome/"+this.username;
    this.linkShop = "../../shop/"+this.username;

    this.farmerService.getWarningsByUsername(this.username).subscribe( (pom: Warning[]) => {
      this.warnings = pom;
    });

    this.farmerService.getProductsForFarmer(this.username).subscribe( (pom: Product[]) => {
      pom.forEach(element => {
        if(element.qHave!=0) this.products.push(element);
      });
    });

    this.toggle=0;

    this.farmerService.getOrders(this.username).subscribe( (pom: Order[]) =>{
      this.orders = pom;
      for(let i=0; i<this.orders.length; i++){
        this.niz.push(this.orders[i].items);
        this.cene.push(this.orders[i].amount);
      }
    });
    
  }

  claim(a): void{
    let items = this.orders[a].items;
    
    let check = 0;

    for(let i=0; i<items.length; i++){
      check=0;
      for(let j=0; j<this.products.length; j++){

        if(this.products[j].name === items[i].name && this.products[j].enterprise === items[i].enterprise){
          this.farmerService.updateProductsQ(this.username, items[i].name, items[i].quantity, items[i]);
          this.enterpriseService.addBusiness(this.username, items[i].enterprise, this.orders[a].amount, this.orders[a].time).subscribe( () => {
          this.farmerService.deleteOrder(this.orders[a].time, this.orders[a].amount).subscribe( () => { location.reload(); });
            });
            check = 1;
            break;
        }
      }
        if(check===0){
          this.farmerService.addProduct(items[i].name, items[i].enterprise, this.username, items[i].speed, items[i].quantity, items[i].price, items[i].tip).subscribe(
            () => {
              this.enterpriseService.addBusiness(this.username, items[i].enterprise, this.orders[a].amount, this.orders[a].time).subscribe( () => {
                this.farmerService.deleteOrder(this.orders[a].time, this.orders[a].amount).subscribe( () => { location.reload();});
              });
            }
          );
        }
      }
  }



}
