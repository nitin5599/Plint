import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsercrudService {

  constructor(public db:AngularFirestore) { }

  createUser(value){
    return this.db.collection('users').add({
      empcode: value.empcode,
      name: value.name,
      email: value.email,
      role: value.role,
      expmanager: value.expmanager,

      // nameToSearch: value.name.toLowerCase(),
      // age: parseInt(value.age),
      // avatar: avatar
    });
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }

}
