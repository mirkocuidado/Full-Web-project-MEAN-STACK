import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Farmer } from './farmer.module';
import { Enterprise } from './enterprise.model';
import {FarmerREQ} from '../../../backend/models/FarmerREQ';
import { Admin } from '../../../backend/models/Admin';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  uri = "http://localhost:4000";

  constructor(private http: HttpClient, private router: Router) { }

  getFarmers(){
    return this.http.get(`${this.uri}/farmers`); //send HTTP get request to the following URL
  }

  getFarmersREQ(){
    return this.http.get(`${this.uri}/farmersREQ`); //send HTTP get request to the following URL
  }

  getFarmerForPassword(username,password, newP, cnewP){
    
    this.http.get(`${this.uri}/farmers/${username}`).subscribe( (pomFarmer:Farmer) => {
      if( pomFarmer !== null && pomFarmer.password === password){
        this.deleteFarmer(username).subscribe( (p: Farmer) => {
          this.addFarmer(pomFarmer.first_name, pomFarmer.last_name, username,newP, cnewP,pomFarmer.birth_date, pomFarmer.mobile,pomFarmer.place,pomFarmer.mail).subscribe( ()=> {
            this.router.navigate([""]);
          });
        });
      }
      else{
        this.http.get(`${this.uri}/enterprises/${username}`).subscribe( (pomEnterprise:Enterprise) => {
          if( pomEnterprise !== null && pomEnterprise.password === password){
            this.http.get(`${this.uri}/enterprises/delete/${username}`).subscribe( () => {
              pomEnterprise.password = newP;
              pomEnterprise.confirm_password = cnewP;
              this.http.post(`${this.uri}/enterprises/add`, pomEnterprise).subscribe( () => {
                this.router.navigate([""]);
              });
            });
          }
          else{
            console.log("Invalid parameters!");
            this.router.navigate(["/passwordchange"]);
          }
        });
      }
    }); 
  }

  getAdminLogIn(username, password):void{ //send HTTP get request to the following URL
    this.http.get(`${this.uri}/admin/${username}`).subscribe( (pomAdmin: Admin) => {
      if( pomAdmin !== null && pomAdmin.password === password){
        this.router.navigate(["/adminhome"]);
      }
    });
  }

  getFarmerByUsername(username){
    return this.http.get(`${this.uri}/farmers/${username}`);
  }

  getFarmerREQById(username, a){
    if(a===1){
      this.http.get(`${this.uri}/farmersREQ/${username}`).subscribe( (pomFarmer: FarmerREQ) => {
        this.addFarmer(pomFarmer.first_name, pomFarmer.last_name,pomFarmer.username,pomFarmer.password,pomFarmer.confirm_password,pomFarmer.birth_date,pomFarmer.mobile,pomFarmer.place,pomFarmer.mail).subscribe( () => {     
          this.deleteFarmerREQ(username).subscribe( () => {});
              });
      });
    }
    else {
      this.deleteFarmerREQ(username).subscribe( () => {});
    }
  }

  addFarmerREQ(first_name, last_name, username,password, confirm_password,birth_date,mobile,place,mail){
    const farmer = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password,
      confirm_password: confirm_password,
      birth_date: birth_date,
      mobile: mobile,
      place: place,
      mail: mail
    };

    // Adding new farmer with the post request to this link
    return this.http.post(`${this.uri}/farmersREQ/add` , farmer);
  }

  addFarmer(first_name, last_name, username,password, confirm_password,birth_date,mobile,place,mail){
    const farmer = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password,
      confirm_password: confirm_password,
      birth_date: birth_date,
      mobile: mobile,
      place: place,
      mail: mail
    };

    // Adding new farmer with the post request to this link
    return this.http.post(`${this.uri}/farmers/add` , farmer);
  }
  
  deleteFarmerREQ(username){ // Sending a HTTP request to this link
    return this.http.get(`${this.uri}/farmersREQ/delete/${username}`);
  }

  deleteFarmer(username){
    return this.http.get(`${this.uri}/farmers/delete/${username}`);
  }

  updateFarmer(username, a){
    return this.http.post(`${this.uri}/farmers/update/${username}`,a).subscribe( () => {this.router.navigate(["/adminallclients"]); });
  }

  //NURSERIES FROM HERE DOWN

  getNurseriesByUsername(username){
    return this.http.get(`${this.uri}/nurseries/${username}`);
  }

  getNurseryByUsernameAndName(username, name){
    return this.http.get(`${this.uri}/nurseries/${username}/${name}`);
  }

  addNursery(name, username,place,width, length, water, temperature, m){
    const nurse = {
      name: name,
      place: place,
      username: username,
      water: water,
      temperature: temperature,
      width: width,
      length: length,
      placeTaken: 0,
      flag : m
    };

    return this.http.post(`${this.uri}/nurseries/add` , nurse);
  }

  updateNursery(username, name, a){

    return this.http.post(`${this.uri}/nurseries/update/${username}/${name}`,a).subscribe( () => {});
  }

  updateNurseryNum(username, name, a){
    return this.http.post(`${this.uri}/nurseries/update/${username}/${name}/num`,a).subscribe( () => {});
  }

  //SEEDLINGS FROM HERE DOWN

  getSeedlingByUsernameAndName(username, name){
    return this.http.get(`${this.uri}/seedlings/${username}/${name}`);
  }

  addSeedling(OwnerUsername, Nurseryname, ManufName, name, x, y, progressFinish){
    const seedling = {
      name: name,
      OwnerUsername: OwnerUsername,
      NurseryName: Nurseryname,
      ManufName: ManufName,
      x: x,
      y: y,
      progressFinish: progressFinish,
      progress: 0
    };

    return this.http.post(`${this.uri}/seedlings/add` , seedling);
  }

  updateSeedling(username, name, nurseryName, a){
    return this.http.post(`${this.uri}/seedlings/update/${username}/${name}/${nurseryName}`,a).subscribe( () => {});
  }

  deleteSeedling(nursery, x, y, user){
    return this.http.get(`${this.uri}/seedlings/delete/${nursery}/${x}/${y}/${user}`);
  }
  // WARNINGS FROM HERE DOWN

  getWarningsByUsername(username){
    return this.http.get(`${this.uri}/warnings/${username}`);
  }

  getWarningsByUsernameAndNursery(username, nursery){
    return this.http.get(`${this.uri}/warnings/${username}/${nursery}`);
  }

  deleteWarning(username, name){
    return this.http.get(`${this.uri}/warnings/delete/${username}/${name}`);
  }

  addWarning(username, nursery){
    const w = {
      username: username,
      nursery: nursery,
      text: "Nursery "+nursery+" needs help!",
      better: 0
    };

    // Adding new farmer with the post request to this link
    return this.http.post(`${this.uri}/warnings/add` , w);
  }

  updateWarning(username, name,a){
    return this.http.post(`${this.uri}/warning/update/${username}/${name}`,a).subscribe( () => {});
  }

  // PRODUCTS FROM HERE DOWN

  getProductsForFarmer(username){
    return this.http.get(`${this.uri}/products/${username}`);
  }

  getProductForFarmer(username, name){
    return this.http.get(`${this.uri}/products/${username}/${name}`);
  }

  getProductForFarmerEnterprise(username, enterprise, name){
    return this.http.get(`${this.uri}/product/${username}/${enterprise}/${name}`);
  }

  getProductsForFarmerEnterprise(username, enterprise, name){
    return this.http.get(`${this.uri}/products/${username}/${enterprise}/${name}`);
  }

  updateProductss(username, name, stor, broj, a){
    return this.http.post(`${this.uri}/products/update/${username}/${name}/${stor}/${broj}`,a).subscribe( () => {
    });
  }

  updateProductsForComments(username, name, storage, a){
    for(let i=0; i<a.length; i++){
      let pom = a[i].storage;
      this.http.post(`${this.uri}/products/comments/comments/${username}/${name}/${pom}`,a).subscribe( () => {});
    }
    return;
  }

  addProduct(name, enterprise, OwnerUsername, speed, qHave, price, tip,s,g){
    const pom = {
      name: name,
      enterprise: enterprise,
      ownerUsername : OwnerUsername, 
      speed: speed,
      qHave: qHave,
      price: price,
      tip: tip,
      given: g,
      grade: 0, 
      numOfGrades: 0, 
      flag: true,
      storage: s
    };

    return this.http.post(`${this.uri}/products/add`, pom);

  }

  updateProductsQ(username, name, quant, ab, a){
    return this.http.post(`${this.uri}/products/updateee/${username}/${name}/${quant}/${ab}`,a).subscribe( () => {
    });
  }
  
  // OFFERS FROM HERE DOWN

  getOffers(){
    return this.http.get(`${this.uri}/offers`);
  }

  getOffersEnterprise(enterprise){
    return this.http.get(`${this.uri}/offers/${enterprise}`);
  }

  addOffer(name, enterprise, speed, qAvailable, price, tip){
    const w = {
      name: name,
      enterprise: enterprise,
      speed: speed,
      qAvailable: qAvailable,
      price: price,
      tip: tip,
      flag: true,
      grade: 0,
      numOfGrades: 0
    };

    // Adding new farmer with the post request to this link
    return this.http.post(`${this.uri}/offers/add` , w);
  }

  updateOffers(enterprise, name, a, b){
    return this.http.post(`${this.uri}/offers/update/${enterprise}/${name}/${a}`, b).subscribe( () => {});
  }

  updateOffersGrade(enterprise, name, a, b){
    return this.http.post(`${this.uri}/offers/update/${enterprise}/${name}/${a}/1`, b).subscribe( () => {});
  }

  deleteOffer(name){
    return this.http.get(`${this.uri}/offers/delete/${name}`);
  }


  // ORDERS FROM HERE DOWN

  getOrders(username){
    return this.http.get(`${this.uri}/orders/${username}`);
  }

  deleteOrder(time, amount){
    return this.http.get(`${this.uri}/orders/delete/${time}/${amount}`);
  }

  addOrder(username, items, amount, name, time, f, storage){
    const o = {
      name: name+items[0].enterprise,
      username: username,
      items: items,
      amount: amount,
      time: time,
      flag: f,
      storage: storage
    };

    return this.http.post(`${this.uri}/orders/add` , o);
  }

  updateOrder(time, enterprise, b){
    return this.http.post(`${this.uri}/orders/update/${time}/${enterprise}`, b).subscribe( () => { });
  }

  // COMMENTS FROM HERE DOWN

  getComments(name, enterprise){
    return this.http.get(`${this.uri}/comments/${name}/${enterprise}`);
  }

  addComment(name, username, enterprise, text, g){
    const com = {
      name: name,
      username: username,
      enterprise: enterprise,
      text: text,
      grade: g
    };

    return this.http.post(`${this.uri}/comments/add` , com);
  }

  //SEND MAIL
  sendMail(mail,nurseryName){
    return this.http.get(`${this.uri}/mail/${mail}/${nurseryName}`).subscribe( () => { });
  }

}
