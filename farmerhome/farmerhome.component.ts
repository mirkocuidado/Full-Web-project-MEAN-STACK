import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FarmerService } from '../farmer.service';
import {Nursery} from '../../../../backend/models/Nursery';
import {Warning} from '../../../../backend/models/Warning';
import { UserService } from '../user.service';

@Component({
  selector: 'app-farmerhome',
  templateUrl: './farmerhome.component.html',
  styleUrls: ['./farmerhome.component.css']
})
export class FarmerhomeComponent implements OnInit {

  constructor(private farmerService: FarmerService, private user: UserService) { }

  username: String;
  nurseries: Nursery[] = [];

  warnings: Warning[] = [];

  nurseryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    width: new FormControl('', [ Validators.required]),
    length: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    temperature: new FormControl('', [Validators.required]),
    water: new FormControl('', [Validators.required])
  });
  
  get(){
    this.farmerService.getNurseriesByUsername(this.username).subscribe( ( pom: Nursery[]) => {
      this.nurseries = pom;
    });
  }

  submit(){
    this.farmerService.addNursery(this.nurseryForm.value.name, this.username, this.nurseryForm.value.place, this.nurseryForm.value.width, this.nurseryForm.value.length, this.nurseryForm.value.water, this.nurseryForm.value.temperature, "1").subscribe( () => {
      const nurse = {
        name: this.nurseryForm.value.name,
        place: this.nurseryForm.value.place,
        username: this.username,
        water: this.nurseryForm.value.water,
        temperature: this.nurseryForm.value.temperature,
        width: this.nurseryForm.value.width,
        length: this.nurseryForm.value.length,
        placeTaken: 0,
        flag : "1"
      };
      this.nurseries.push(nurse);
    });
  }

  helperWarnings: Warning[] = [];

  ngOnInit(): void {
    this.username = localStorage.getItem("logged");
    this.get();

    this.farmerService.getWarningsByUsername(this.username).subscribe( (pom: Warning[]) => {
      this.helperWarnings = pom;
      for(let i=0; i<this.helperWarnings.length; i++){ //samo jednom da se ispisu
        let flag = 0;
        for(let j=0;j<this.warnings.length; j++){
          if(this.warnings[j].username === this.helperWarnings[i].username &&
             this.warnings[j].nursery === this.helperWarnings[i].nursery){
              flag = 1;
              break;
             }
        }
        if(flag===0){this.warnings.push(this.helperWarnings[i]); }
      }
    });
  }

  logOut(){
    this.user.setLogged("");
  }

  postavi(a,b){
    localStorage.setItem("nursery",b);
  }

}
