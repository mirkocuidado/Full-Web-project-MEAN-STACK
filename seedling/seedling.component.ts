import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { Router, ActivatedRoute } from '@angular/router';
import Nursery from '../../../../backend/models/Nursery';
import Seedling from '../../../../backend/models/Seedling';
import Product from '../../../../backend/models/Product';
import Farmer from '../../../../backend/models/Farmer';
import {Warning} from '../../../../backend/models/Warning';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-seedling',
  templateUrl: './seedling.component.html',
  styleUrls: ['./seedling.component.css']
})
export class SeedlingComponent implements OnInit {

  constructor(private farmerService: FarmerService, private router: Router, private user:UserService) { }

  username: String;
  nurseryName: String;
  
  nursery: Nursery;
  seedlings: Seedling[] = [];
  
  width: number[] = [];
  length: number[] = [];
  matrix: number[][] = [];
  
  temperature: number;
  water: number;

  hoveredSeedling: Seedling;

  products: Product[] = [];
  product: String;
  chosen: Product;

  warnings: Warning[] = [];

  nurseryForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });
  
  a:number;
  i:number;
  j:number; 
  
  blabla(i,j,a):void{
    this.i = i;
    this.j = j;
    for(let k=0; k<this.seedlings.length; k++){
      if(this.seedlings[k].x ==i && this.seedlings[k].y ===j){
        this.hoveredSeedling = this.seedlings[k];
        break;
      }
    }

    this.a=a;
  }

  exit(){
    this.a = 0;
  }

  updateNursery(param){
    const changeW = this.nursery;

    if(param===0){
      changeW.water = changeW.water + 1;
    }
    else if(param===-1){
      changeW.temperature = changeW.temperature -1;
    }
    else if(param===1){
      changeW.temperature = changeW.temperature + 1;
    }

    if(changeW.water<75 || changeW.temperature <12){
      this.farmerService.deleteWarning(this.username, this.nurseryName).subscribe(()=>{
        this.farmerService.addWarning(this.username, this.nurseryName).subscribe( ()=> {});
      });
    }

    if(this.warnings.length!=0){
      if(changeW.water>=75 && changeW.temperature >=12){
        this.farmerService.deleteWarning(this.username, this.nurseryName).subscribe( () => {});
      }
    }

    this.farmerService.updateNursery(changeW.username, changeW.name, changeW);
  }

  pom: Product;

  submit(){
    let name = this.nurseryForm.value.name + this.i + this.j;
    this.farmerService.getProductForFarmer(this.username, this.nurseryForm.value.name).subscribe( (p:Product)=>{
      this.pom = p;
      this.farmerService.addSeedling(this.username, this.nurseryName, this.pom.enterprise , name, this.i, this.j, this.pom.speed).subscribe( ()=> { 
        this.farmerService.updateNurseryNum(this.username, this.nurseryName, "NISTA BITNO");
        this.pom.qHave = this.pom.qHave - 1;
        this.farmerService.updateProducts(this.username, this.nurseryForm.value.name, this.pom);
        location.reload(); });
    });
  }

  p:any;
  pomm: any;

  addMe(){
    for(let i=0; i<this.products.length; i++){
      if(this.products[i].name == this.product){
        this.chosen = this.products[i];
        break;
      }
    }

    this.p = this.chosen;
    this.p.qHave = this.p.qHave - 1;

    this.pomm = this.hoveredSeedling;
    this.pomm.progress = this.pomm.progress + this.p.speed;

    this.farmerService.updateSeedling(this.username, this.hoveredSeedling.name, this.nurseryName, this.pomm);

    this.farmerService.updateProducts(this.username, this.p.name, this.p);
  }

  preparati: any[] = [];
  biljke: any[] = [];
  
  ngOnInit(): void {
    this.username = localStorage.getItem("logged");
    this.nurseryName = localStorage.getItem("nursery");
    
    this.farmerService.getNurseryByUsernameAndName(this.username, this.nurseryName).subscribe( (pom: Nursery) => {
      this.nursery = pom;
      this.temperature = pom.temperature;
      this.water = pom.water;

      for(let i =0; i<this.nursery.width; i++){
        this.width.push(i);
        this.length.push(i);
        this.matrix[i] = [];
        for(let j =0; j<this.nursery.length; j++){
          this.matrix[i][j]=0;
        }
      } 
    });

    this.farmerService.getSeedlingByUsernameAndName(this.username, this.nurseryName).subscribe( (pom:Seedling) => {
      this.seedlings = pom;
      for(let i=0; i<this.seedlings.length; i++){
        this.matrix[this.seedlings[i].x][this.seedlings[i].y]=1;
      }
    });

    this.a=0;
    
    this.farmerService.getProductsForFarmer(this.username).subscribe( (pom: Product[])=>{
      this.products = pom;
      for(let i=0; i<this.products.length; i++){
        if(this.products[i].tip=="pr" && this.products[i].qHave>0)
          this.preparati.push(this.products[i]);
        else if(this.products[i].qHave>0)
          this.biljke.push(this.products[i]);
      }
    });

    this.farmerService.getWarningsByUsername(this.username).subscribe( (pom: Warning[]) => {
      this.warnings = pom;
    });
  }

  vadiMe(a,b):void{
      this.farmerService.deleteSeedling(this.nurseryName, a , b).subscribe( ()=> {
        location.reload();
      });
  }
}
