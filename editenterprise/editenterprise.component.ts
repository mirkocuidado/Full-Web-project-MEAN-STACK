import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../enterprise.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Enterprise} from '../../../../backend/models/Enterprise';
import { UserService } from '../user.service';
@Component({
  selector: 'app-editenterprise',
  templateUrl: './editenterprise.component.html',
  styleUrls: ['./editenterprise.component.css']
})
export class EditenterpriseComponent implements OnInit {

  flag2: number;

  username1: string;
  farmer: Enterprise;

  name: string;
  username2: string;
  password: string;
  confirm_password: string;
  date: string;
  place: string;
  mail: string;

  constructor(private enterpriseService: EnterpriseService, private router: Router, private user: UserService) { }

  ngOnInit(): void {
    this.username1 = localStorage.getItem("edit");
    this.enterpriseService.getEnterpriseByUsername(this.username1).subscribe( (pomFarmer: Enterprise) => {
      this.name = pomFarmer.name;
      this.username2 = pomFarmer.username;
      this.password = pomFarmer.password;
      this.confirm_password = pomFarmer.confirm_password;
      this.date = pomFarmer.foundation_date;
      this.place = pomFarmer.place;
      this.mail = pomFarmer.mail;
    });
  }

  update_enterprise(){

    this.flag2 = 0;

    this.enterpriseService.getEnterpriseByUsername(this.username2).subscribe( (a: Enterprise) => {
      if(a && this.username2 != this.username1){
        alert("Username already taken.");
        this.flag2 = 1;
      }
    });

    if(this.flag2 === 1){
      this.router.navigate(["/editenterprise"]);
      return;
    }
    else{
      const ent = {
        name: this.name,
        username: this.username2,
        password: this.password,
        confirm_password: this.confirm_password,
        date: this.date,
        place: this.place,
        mail: this.mail
      };

        let reg1 = /[A-Z]+/;
        let reg2 = /\d+/;
        let reg3 = /[a-z]+/;
        let reg4 = /\w{8}/;
        let mailCheck = /^\w+@\w+\.\w+$/;
        let passCheck2 = /[a-z]/i;

        if(this.password !== this.confirm_password){
          alert("Password does not match the confirmed one!");
        }
        else{
          if(!reg1.test(this.password) || !reg2.test(this.password) || !reg3.test(this.password) || !reg4.test(this.password) || !passCheck2.test(this.password[0])){
            alert("Invalid password!");
          }
          else{
            if(!mailCheck.test(this.mail)){
              alert("Invalid e-mail address!");
            }
            else{
              this.enterpriseService.updateEnterprise(this.username1, ent);
            }
          }
        }
    }
  }
}
