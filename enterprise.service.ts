import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Enterprise } from './enterprise.model';
import { EnterpriseREQ } from '../../../backend/models/EnterpriseREQ';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  uri = "http://localhost:4000";

  constructor(private http: HttpClient, private router: Router) { }

  // return all the farmers
  getEnterprises(){
    return this.http.get(`${this.uri}/enterprises`); //send HTTP get request to the following URL
  }

  getEnterprisesREQ(){
    return this.http.get(`${this.uri}/enterprisesREQ`); //send HTTP get request to the following URL
  }

  getEnterpriseById(username, password){ //send HTTP get request to the following URL
    this.http.get(`${this.uri}/enterprises/${username}`).subscribe( (pomEnterprise:Enterprise) => {
      if( pomEnterprise !== null && pomEnterprise.password === password){
        this.router.navigate([""]); // na login jer drugo mi ne radi jos
      }
      else{
        console.log("Invalid parameters!");
        this.router.navigate([""]);
      }
    }); 
    
  }

  getEnterpriseByUsername(username){ //send HTTP get request to the following URL
    return this.http.get(`${this.uri}/enterprises/${username}`);  
  }

  getEnterpriseREQById(username, a){
    if(a===1){
      this.http.get(`${this.uri}/enterprisesREQ/${username}`).subscribe( (pomEnterprise: EnterpriseREQ) => {
        this.addEnterprise(pomEnterprise.name, pomEnterprise.username,pomEnterprise.username,pomEnterprise.password,pomEnterprise.confirm_password,pomEnterprise.foundation_date,pomEnterprise.mail,pomEnterprise.place).subscribe( () => { 
                this.deleteEnterpriseREQ(username).subscribe( () => {});
              });
      });
    }
    else {
      this.deleteEnterpriseREQ(username).subscribe( () => {});
    }
  }

  addEnterpriseREQ(name, abb, username,password, confirm_password,foundation_date,mail,place){
    const enterprise = {
      name: name,
      abb: abb,
      username: username,
      password: password,
      confirm_password: confirm_password,
      foundation_date: foundation_date,
      mail: mail,
      place: place,
      postman: 0
    };

    // Adding new farmer with the post request to this link
    return this.http.post(`${this.uri}/enterprisesREQ/add` , enterprise);
  }

  addEnterprise(name, abb, username,password, confirm_password,foundation_date,mail,place){
    const enterprise = {
      name: name,
      abb: abb,
      username: username,
      password: password,
      confirm_password: confirm_password,
      foundation_date: foundation_date,
      mail: mail,
      place: place,
      postman: 0
    };
    return this.http.post(`${this.uri}/enterprises/add` , enterprise);
  }

  deleteEnterpriseREQ(username){
    return this.http.get(`${this.uri}/enterprisesREQ/delete/${username}`);
  }

  deleteEnterprise(username){
    return this.http.get(`${this.uri}/enterprises/delete/${username}`);
  }

  updateEnterprise(username, a){
    return this.http.post(`${this.uri}/enterprises/update/${username}`,a).subscribe( () => { this.router.navigate(["/adminallclients"])});
  }

  getOrders(username){
    return this.http.get(`${this.uri}/orders/${username}/1`);
  }

  deleteOrder(username, amount){
    return this.http.get(`${this.uri}/orders/delete/${username}/${amount}/1`);
  }

  deleteOrder2(username, time){
    return this.http.get(`${this.uri}/orders/delete/${username}/${time}/1/1`);
  }
  updateOrder(time, enterprise, b){
    return this.http.post(`${this.uri}/orders/update/${time}/${enterprise}/1`, b).subscribe( () => { });
  }

  // POSTMAN FROM HERE DOWN
  updatePostman(username, postman, time, b, date){
    return this.http.post(`${this.uri}/postman/update/${username}/${postman}/${time}/${date}`, b).subscribe( () => {});
  }

  // BUSINESS FROM HERE DOWN

  getBusiness(enterprise){
    return this.http.get(`${this.uri}/business/${enterprise}`);
  }

  addBusiness(username,enterprise, amount, date){
    const business = {
      username: username,
      enterprise: enterprise,
      amount: amount,
      date: date
    };
    return this.http.post(`${this.uri}/business/add` , business);
  }










}
