import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmerService } from '../farmer.service';
import { Order } from '../../../../backend/models/Order';
import { EnterpriseService } from '../enterprise.service';

@Component({
  selector: 'app-workerhome',
  templateUrl: './workerhome.component.html',
  styleUrls: ['./workerhome.component.css']
})
export class WorkerhomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private farmerService: FarmerService, private router: Router, private enterpriseService: EnterpriseService) { }

  orders:Order[] = [];

  niz: any [] = [];
  cene: any[] = [];

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
      this.enterpriseService.deleteOrder(this.route.snapshot.paramMap.get('username'), this.cene[a]).subscribe( () => { 
       location.reload();});
    }
    else if(b==1){
       this.enterpriseService.updateOrder(this.route.snapshot.paramMap.get('username'), this.cene[a], this.orders[a]);
    }
  }

  username: String;
  
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.enterpriseService.getOrders(this.route.snapshot.paramMap.get('username')).subscribe( (pom: Order[]) => {
      this.orders = pom;
      for(let i=0; i<this.orders.length; i++){
        this.niz.push(this.orders[i].items);
        this.cene.push(this.orders[i].amount);
      }
    });
    this.toggle=0;
  }

}
