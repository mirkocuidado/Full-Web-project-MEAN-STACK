import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { Farmer } from '../../../../backend/models/Farmer';
import { Enterprise } from '../../../../backend/models/Enterprise';
import { EnterpriseService } from '../enterprise.service';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {

  username: string;
  oldpassword: string;
  newpassword: string;
  confirm_newpassword: string;

  constructor(private farmerService: FarmerService, private enterpriseService: EnterpriseService) { }

  ngOnInit(): void {
  }

  submit(){

    this.farmerService.getFarmerByUsername(this.username).subscribe( (f:Farmer)=> {
      if(f===null) {
        this.enterpriseService.getEnterpriseByUsername(this.username).subscribe( (f:Enterprise) => {
        if(f===null) alert("User doesn't exist!");
        else if(this.oldpassword!=f.password) alert("Passwords don't match!");
        else if(this.oldpassword === this.newpassword) alert("New password can't be the same as the previous one!");
        else if(this.newpassword !== this.confirm_newpassword) alert("New and confirmed passwords must be the same!");
          else {
            let reg1 = /[A-Z]+/;
            let reg2 = /\d+/;
            let reg3 = /[a-z]+/;
            let reg4 = /\w{8}/;
            let passCheck2 = /[a-z]/i;
  
            if(!reg1.test(this.newpassword) || !reg2.test(this.newpassword) || !reg3.test(this.newpassword) || !reg4.test(this.newpassword) || !passCheck2.test(this.newpassword[0])){
              alert("Invalid new password!");
            }
            else {
              this.farmerService.getFarmerForPassword(this.username, this.oldpassword, this.newpassword, this.confirm_newpassword);
            }
          }
        });
      }
      else{
        if(this.oldpassword!=f.password) alert("Passwords don't match!");
        else if(this.oldpassword === this.newpassword) alert("New password can't be the same as the previous one!");
        else if(this.newpassword !== this.confirm_newpassword) alert("New and confirmed passwords must be the same!");
          else {
            let reg1 = /[A-Z]+/;
            let reg2 = /\d+/;
            let reg3 = /[a-z]+/;
            let reg4 = /\w{8}/;
            let passCheck2 = /[a-z]/i;
  
            if(!reg1.test(this.newpassword) || !reg2.test(this.newpassword) || !reg3.test(this.newpassword) || !reg4.test(this.newpassword) || !passCheck2.test(this.newpassword[0])){
              alert("Invalid new password!");
            }
            else {
              this.farmerService.getFarmerForPassword(this.username, this.oldpassword, this.newpassword, this.confirm_newpassword);
            }
          }
      }
    });
      
    
  }
}
