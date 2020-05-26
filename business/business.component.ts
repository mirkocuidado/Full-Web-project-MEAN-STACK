import { Component, OnInit, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import { Router } from '@angular/router';
import { EnterpriseService } from '../enterprise.service';
import { Business } from '../../../../backend/models/Business';

interface Stats{
  date: any,
  times: number
}

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  //chart: any;
  constructor(private router: Router, private enterpriseService: EnterpriseService) { }

  data: Business[] = [];

  enterprise: String;

  d: any[] = [];
  t: any[] = [];
  m: any[] = [];

  niz: Stats[] = [];

  @ViewChild('lineChart', {static: true}) private chartRef;
  chart : any;
    
  metoda():void{
    this.enterprise = localStorage.getItem("logged");

    this.enterpriseService.getBusiness(this.enterprise).subscribe( (pom: Business[]) => {
      this.data = pom;

      let today = new Date();

      for(let i=0; i<30; i++){
        let priorDate = new Date().setDate(today.getDate()-i);
        let priorDateISO = new Date(priorDate).toISOString();
        let a = priorDateISO.split("T");
        let date = a[0];
        let stat = {
          date: date,
          times: 0
        };
        this.niz.push(stat);
      }
      
      for(let i=0; i<this.data.length; i++){
        let a = this.data[i].date.split("T");
        let date = a[0];
        for(let j=0; j<30; j++){
          if(date === this.niz[j].date ){
            this.niz[j].times += 1;
            break;
          }
        }
      }
      
      for(let i=0; i<this.niz.length; i++){
        this.m.push(this.niz[i].date);
        this.t.push(this.niz[i].times);
      }
    });
  }

  ngOnInit(): void {
    this.metoda();
    this.enterprise = localStorage.getItem("logged");

    this.enterpriseService.getBusiness(this.enterprise).subscribe( (pom: Business[]) => {

      this.chart = new Chart(this.chartRef.nativeElement,{
        type: 'bar',
            data: {
              labels: this.m,
              datasets: [
                {
                  data: this.t,
                  borderColor: '#3cba9f',
                  backgroundColor: 'skyblue',
                  fontColor: "red",
                  fill: false
                }
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }],
              }
            }
            });

            
    });
    
  }

}
