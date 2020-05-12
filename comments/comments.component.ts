import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmerService } from '../farmer.service';
import { EnterpriseService } from '../enterprise.service';
import { Comment } from '../../../../backend/models/Comment';
import { Product } from '../../../../backend/models/Product';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  username: String;
  name: String;
  enterprise: String;

  comments: Comment[] = [];

  a: number;

  com:String;
  grade: number;

  p: Product;

  constructor(private farmerService: FarmerService, private router: Router, private enterpriseService: EnterpriseService) { }

  addComment():void{
    this.farmerService.addComment(this.name, this.username, this.enterprise, this.com, this.grade).subscribe( ()=> {
      this.farmerService.getProductForFarmerEnterprise(this.username, this.enterprise, this.name).subscribe( (p: Product) =>{
        this.p = p;
        this.p.given = 1;
        this.farmerService.updateProducts(this.username, this.name, this.p);
      });
      
      this.farmerService.updateOffersGrade(this.enterprise, this.name, this.grade, this.p);

    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem("logged");
    this.name = localStorage.getItem("product");
    this.enterprise = localStorage.getItem("enterprise");

    console.log(this.username);

    this.farmerService.getComments(this.name, this.enterprise).subscribe( (pom: Comment[]) => {
      this.comments = pom;
    });

    this.farmerService.getProductForFarmerEnterprise(this.username, this.enterprise, this.name).subscribe( (pom: Product) => {
        if(pom===null){
          this.a = 0;
        }
        else{
          if(pom.given === 0) this.a = 1;
          else this.a = 0;
        }
      });
  }

}
