import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  logged: String;

  editUser: string;

  nursery: string;

  constructor() { }

  setLogged(s):void{
    this.logged= s;
  }

  getLogged():String{
    return this.logged;
  }

  setEditUser(s):void{
    this.editUser=s;
  }

  getEditUser():string{
    return this.editUser;
  }

  setNursery(s):void{
    this.nursery= s;
  }

  getNursery():String{
    return this.nursery;
  }

}
