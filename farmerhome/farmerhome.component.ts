import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FarmerService } from '../farmer.service';
import {Nursery} from '../../../../backend/models/Nursery';
import {Warning} from '../../../../backend/models/Warning';

@Component({
  selector: 'app-farmerhome',
  templateUrl: './farmerhome.component.html',
  styleUrls: ['./farmerhome.component.css']
})
export class FarmerhomeComponent implements OnInit {

  constructor(private farmerService: FarmerService, private route:ActivatedRoute) { }

  username: string;
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
      location.reload();
    });
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.get();

    this.farmerService.getWarningsByUsername(this.username).subscribe( (pom: Warning[]) => {
      this.warnings = pom;
    });
  }

}
