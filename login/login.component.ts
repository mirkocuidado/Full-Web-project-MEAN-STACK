import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnterpriseService } from '../enterprise.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private farmerService: FarmerService,private enterpriseService: EnterpriseService, private router: Router) { }

  farmerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  login(){
    this.farmerService.getFarmerById(this.farmerForm.value.username, this.farmerForm.value.password);
  }

}
