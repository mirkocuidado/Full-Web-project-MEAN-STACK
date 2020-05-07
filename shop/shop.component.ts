import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmerService } from '../farmer.service';
import { Offer } from '../../../../backend/models/Offers';
import { Enterprise } from '../../../../backend/models/Enterprise';
import { EnterpriseService } from '../enterprise.service';


export interface OrderLine{
  name: String,
  quantity: number,
  price: number,
  enterprise: String
};

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {

  constructor(private route: ActivatedRoute, private farmerService: FarmerService, private router: Router, private enterpriseService: EnterpriseService) { }

  num: number;
  a: number;

  products: Offer[] = [];
  enterprises: Enterprise[] = [];

  orderList: OrderLine[] = [];
  s:string = "";

  orderListList: OrderLine[][]=[];
  cene: number[] = [];

  broj: number;
  amount: number;

  svi: any []= [];

  popuni():void{
    for(let i=0; i<this.products.length; i++){
      let e = this.products[i].enterprise;
      let index = 0;
      for(let j =0; j<this.enterprises.length; j++){
        if(this.enterprises[j].abb === e){
          index = j;
          break;
        }
      }
      this.svi[index].push(this.products[i]);
    }
  }

  get():void{
    this.farmerService.getOffers().subscribe( (p:Offer[])=>{
      this.products = p;
    });

    this.enterpriseService.getEnterprises().subscribe( (p: Enterprise[]) => {
      for(let i =0; i<p.length; i++){
        this.orderListList.push([]);
        this.svi.push([]);
        this.cene.push(0);
      }
      this.enterprises = p;
      this.popuni();
    });

  }
  linkHome: String;
  linkSto: String;
  username: String;

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');

    this.linkHome = "../../farmerhome/"+this.username;
    this.linkSto = "../../storage/"+this.username;

    this.get();
    this.a=0;
    if(localStorage.getItem("order")==null)
      localStorage.setItem("order", JSON.stringify(this.orderList));
    else
      this.orderList = JSON.parse(localStorage.getItem("order"));

    this.amount = 0;
    if(this.orderList.length!=0){
      for(let i =0; i<this.orderList.length; i++)
        this.amount+=this.orderList[i].price*this.orderList[i].quantity;
    }
  }

  submit():void{
    this.a = 0;

    let bla = this.orderList.pop();
    console.log(bla);

    for(let i =0; i<this.orderList.length; i++){
      if(this.orderList[i].name == this.s){
        let a = this.num;
        this.orderList[i].quantity += a;
        this.amount += a*this.orderList[i].price;
        localStorage.setItem("order", JSON.stringify(this.orderList));
        return;
      }
    }
    
    bla.quantity = this.num;
    this.orderList.push(bla);
    this.amount += this.num * this.orderList[this.orderList.length-1].price;
    localStorage.setItem("order", JSON.stringify(this.orderList));
  }

  add(aa,b,c):void{
    this.a = 1;
    this.s = aa;

    let p = {
      name : aa,
      enterprise : c,
      price : b,
      quantity: 0
    };

    this.orderList.push(p);
  }

  delete(a):void{
    this.amount -= this.orderList[a].quantity * this.orderList[a].price;
    if(this.amount<0) this.amount=0;
    this.orderList.splice(a,1);
    localStorage.setItem("order", JSON.stringify(this.orderList));
  }

  order(){
    const d = new Date();

    for(let i=0; i<this.enterprises.length; i++){
      for(let j=0; j<this.orderList.length; j++){
        if(this.orderList[j].enterprise === this.enterprises[i].abb){
          this.orderListList[i].push(this.orderList[j]);
        }
      }
    }

    //console.log(this.orderListList);

    for(let i=0; i<this.orderListList.length; i++)
      if(this.orderListList[i].length!=0)
        for(let j=0; j<this.orderListList[i].length; j++){
          this.cene[i]+=this.orderListList[i][j].quantity * this.orderListList[i][j].price;
        }

    for(let i=0; i<this.orderListList.length; i++){
      if(this.orderListList[i].length!=0){
        //console.log(this.orderListList[i]);
        this.farmerService.addOrder(this.route.snapshot.paramMap.get('username'), this.orderListList[i], this.cene[i], "ORDER", d, false).subscribe( ()=> {
          
          
          
          for(let j=0; j<this.orderListList[i].length; j++){
            //console.log(this.orderListList[i]);
            this.farmerService.updateOffers(this.orderListList[i][j].enterprise, this.orderListList[i][j].name, this.orderListList[i][j].quantity, this.orderListList[i][j]);
          }
        });
      }
    }

    localStorage.removeItem('order');
    location.reload();

  }
}
