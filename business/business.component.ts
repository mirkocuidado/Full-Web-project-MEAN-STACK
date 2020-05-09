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

  @ViewChild('lineChart', {static: true}) private chartRef;
  chart : any;
    
  ngOnInit(): void {
    this.enterprise = localStorage.getItem("logged");

    this.enterpriseService.getBusiness(this.enterprise).subscribe( (pom: Business[]) => {
      this.data = pom;

      let today = new Date();

      for(let i=0; i<30; i++){
        this.t.push(0);
        let priorDate = new Date().setDate(today.getDate()-i);
        let priorDateISO = new Date(priorDate).toISOString();
        this.d.push(priorDateISO);
      }

      var priorDatee = new Date().setDate(today.getDate()-30);
      let pompom = new Date(priorDatee).toISOString();
      let toto = new Date(today).toISOString();

      for(let i=0; i<this.data.length; i++){
        if(this.data[i].date <= toto && this.data[i].date>=pompom){
          for(let j=0; j<this.data.length; j++){

            let a = new Date(this.d[j]);
            let b = new Date(this.data[i].date);

            if(a.getMonth() === b.getMonth() && a.getDay() === b.getDay()){
              this.t[j]++;
              break;
            }
          }
        }
      }

      for(let i=0; i<this.d.length; i++){
        let dd = new Date(this.d[i]);
        let mesec = dd.getMonth()+1;
        let dan = dd.getDay();

        let zajedno = dan + "." + mesec + ".";
        this.m[i] = zajedno;
      }

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
